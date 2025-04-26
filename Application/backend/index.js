var mysql = require('mysql2')
var express = require('express')
var bodyParser = require('body-parser')
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'siddis',
  database: 'dbms',
})
var jsonParser = bodyParser.json()
const app = express()
connection.getConnection(function (err, conn) {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  const updateDriverQuery = `
    UPDATE driver AS d
    JOIN (
        SELECT 
            Driver_Id, 
            COUNT(*) AS total_trips,
            AVG(Driver_rating) AS avg_rating
        FROM ride
        WHERE Driver_Id IS NOT NULL
        GROUP BY Driver_Id
    ) AS r ON d.Driver_id = r.Driver_Id
    SET 
        d.No_of_Trips = r.total_trips,
        d.Rating = IFNULL(r.avg_rating, 0);
  `;

  const updateCustomerQuery = `
    UPDATE customer AS c
    JOIN (
        SELECT 
            Customer_Id, 
            COUNT(*) AS total_trips,
            AVG(Customer_rating) AS avg_rating
        FROM ride
        WHERE Customer_Id IS NOT NULL
        GROUP BY Customer_Id
    ) AS r ON c.Customer_id = r.Customer_Id
    SET 
        c.No_of_Trips = r.total_trips,
        c.Rating = IFNULL(r.avg_rating, 0);
  `;

  conn.query(updateDriverQuery, function (error, results, fields) {
    if (error) {
      console.error('Error updating drivers:', error);
    } else {
      console.log('Driver table updated successfully');
    }

    conn.query(updateCustomerQuery, function (error, results, fields) {
      if (error) {
        console.error('Error updating customers:', error);
      } else {
        console.log('Customer table updated successfully');
      }

      conn.release(); // Release after both queries
    });
  });
});
app.get('/users', function (req, res) {
  connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM driver', function (error, results, fields) {
      if (error) throw error
      res.send(results)
    })
  })
})
// app.get('/NearbyBookings', function (req, res) {
//   const driverId = req.query.driverId; // get from query string like ?driverId=94

//   let sql = `SELECT Driver_Id, v4.s AS SourceName, v4.cl AS CurrentLocation, v4.Ride_id, v4.date,
//     SQRT(POWER((a.X_Coordinate - b.X_Coordinate), 2) + POWER((a.Y_Coordinate - b.Y_Coordinate), 2)) AS Distance
//     FROM v4
//     JOIN location a ON a.Location_Name = v4.s
//     JOIN location b ON b.Location_Name = v4.cl
//     WHERE Driver_Id = ? AND v4.date NOT IN (
//       SELECT ride.Date FROM ride WHERE Driver_id = ? AND Status = 'Booked'
//     )
//     ORDER BY Distance;`

//   connection.getConnection(function (err, connection) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send(err);
//     }

//     connection.query(sql, [driverId, driverId], function (error, results) {
//       connection.release(); // release connection back to pool
//       if (error) {
//         console.log(error);
//         return res.status(500).send(error);
//       }
//       console.log(results)
//       res.send(results);
//     })
//   })
// })

app.get('/NearbyBookings', function (req, res) {
  const driverId = req.query.driverId;

  if (!driverId) {
    return res.status(400).send({ error: 'Missing driverId in query' });
  }

  // Step 1: Get driver's current location
  const getLocationSQL = `SELECT Current_Location FROM driver WHERE Driver_Id = ?`;

  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    connection.query(getLocationSQL, [driverId], function (error, results) {
      if (error) {
        connection.release();
        console.log(error);
        return res.status(500).send(error);
      }

      if (results.length === 0) {
        connection.release();
        return res.status(404).send({ error: 'Driver not found' });
      }

      const currentLocation = results[0].Current_Location;

      // Step 2: Use current location to calculate distance to nearby rides
      const getNearbyRidesSQL = `
        SELECT 
          r.Ride_id,
          r.SourceName,
          r.DestinationName,
          r.Date,
          r.Distance,
          r.Vehicle_Type,
          r.Cost,
          r.OTP,
          r.Payment_method,
          SQRT(
            POWER((ls.X_Coordinate - ld.X_Coordinate), 2) + 
            POWER((ls.Y_Coordinate - ld.Y_Coordinate), 2)
          ) AS Distance
        FROM ride r
        JOIN location ls ON ls.Location_Name = r.SourceName
        JOIN location ld ON ld.Location_Name = ?
        WHERE r.Status = 'REQUESTED'
          AND r.Driver_Id IS NULL
        ORDER BY Distance ASC
        LIMIT 5
      `;

      connection.query(getNearbyRidesSQL, [currentLocation], function (error2, results2) {
        connection.release();

        if (error2) {
          console.log(error2);
          return res.status(500).send(error2);
        }
        console.log(results2);
        res.send(results2);
      });
    });
  });
});

app.post('/DriverInfo', jsonParser, function (req, res) {
  let sql = `Select * from driver where Driver_Id=${req.body.Driver_Id}`
  console.log(sql)
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.send(error)
      }
      console.log(results)
      res.send(results)
    })
  })
})
app.get('/DriverDetails/:id',jsonParser, (req, res) => {
  const driverId = req.params.id;
  const sql = `SELECT * FROM driver WHERE Driver_id = ?`;

  connection.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Connection error' });
    }

    connection.query(sql, [driverId], (error, results) => {
      connection.release();
      if (error) {
        console.error(error);
        return res.status(500).send({ error: 'Query error' });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: 'Driver not found' });
      }
      res.send(results[0]);
    });
  });
});

app.post('/CustomerSignUp', jsonParser, function (req, res) {
  const {
    Age,
    Name,
    Wallet = 0,
    Phone_Number,
    Email_Address,
    Rating = 0,
    No_of_Trips = 0,
    Home_Location,
  } = req.body

  const sql = `
    INSERT INTO customer (
      Age,
      Name,
      Wallet,
      Phone_Number,
      Email_Address,
      Rating,
      No_of_Trips,
      Home_Location
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  connection.getConnection(function (err, connection) {
    if (err) {
      console.error('Connection error:', err)
      return res.status(500).send({ error: 'Connection error' })
    }

    connection.query(
      sql,
      [
        Age,
        Name,
        Wallet,
        Phone_Number,
        Email_Address,
        Rating,
        No_of_Trips,
        Home_Location,
      ],
      function (error, results) {
        connection.release()
        if (error) {
          console.error('Insert error:', error)
          return res.status(500).send({ error: 'Insert failed', details: error })
        }

        res.send({
          message: 'Customer signed up successfully',
          Customer_id: results.insertId,
        })
      }
    )
  })
})
app.post('/AddMoneyToWallet', jsonParser, (req, res) => {
  const { Customer_id, Amount } = req.body;

  const sql = `
    UPDATE customer
    SET Wallet = Wallet + ?
    WHERE Customer_id = ?
  `;

  connection.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Connection error' });
    }

    connection.query(sql, [Amount, Customer_id], (error, results) => {
      connection.release();
      if (error) {
        console.error(error);
        return res.status(500).send({ error: 'Update failed' });
      }
      res.send({ message: 'Wallet updated successfully' });
    });
  });
});
app.get('/CustomerDetails/:id', (req, res) => {
  const customerId = req.params.id;

  const sql = `SELECT * FROM customer WHERE Customer_id = ?`;

  connection.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Connection error' });
    }

    connection.query(sql, [customerId], (error, results) => {
      connection.release();
      if (error) {
        console.error(error);
        return res.status(500).send({ error: 'Query error' });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: 'Customer not found' });
      }
      res.send(results[0]);
    });
  });
});

app.get('/AnalysisOLAP', function (req, res) {
  const sql = `
    SELECT
      SourceName,
      COUNT(*) AS TotalTrips
    FROM ride
    GROUP BY SourceName
    ORDER BY TotalTrips DESC
  `;

  connection.getConnection(function (err, connection) {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }

    connection.query(sql, function (error, results) {
      connection.release()
      if (error) {
        console.error(error)
        return res.status(500).send(error)
      }

      res.send(results)
    })
  })
})


app.get('/VehicleAndDriverRevenueOLAP', jsonParser, function (req, res) {
  let sql = `SELECT 
  Vehicle_Type, 
  Driver_Id, 
  SUM(Cost) AS TotalCost
FROM ride
where Status='COMPLETED'
Group By Vehicle_Type, Driver_Id With ROllUP;`

  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      res.send(results)
    })
  })
})

app.get('/YearlyRevenueOLAP', jsonParser, function (req, res) {
  let sql = `Select Year(Date) as Y,Month(Date) as M,Date,Sum(Cost) as C from ride
  where Status='COMPLETED'
  Group by Year(Date),Month(Date),Date with Rollup;
  `
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      res.send(results)
    })
  })
})

app.get('/AgeWiseRevenueOLAP', jsonParser, function (req, res) {
  let sql = `SELECT floor(Age/10)*10 as Age_Group, COUNT(Customer_id) as customer_count, AVG(No_of_Trips) as avg_trips
  FROM customer
  WHERE Home_Location = 'Hauz Khas'
  GROUP BY floor(Age/10)*10;
  `
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      res.send(results)
    })
  })
})

// API endpoint to fetch prices for all vehicle types
app.post('/getPrices',jsonParser, (req, res) => {
  const { SourceName, DestinationName } = req.body

  // SQL query to fetch prices for all vehicle types
  const query = `
    SELECT 
      a.Location_Name AS Source,
      b.Location_Name AS Destination,
      v.Type,
      SQRT(POWER(a.X_Coordinate - b.X_Coordinate, 2) + POWER(a.Y_Coordinate - b.Y_Coordinate, 2)) AS Distance,
      AVG(
          CASE 
              WHEN v.Type = 'Go' THEN 7.8  
              WHEN v.Type = 'Prime' THEN 10.6  
              WHEN v.Type = 'XL' THEN 14.5  
              WHEN v.Type = 'Moto' THEN 3.6  
              WHEN v.Type = 'Lux' THEN 20  
          END * SQRT(POWER(a.X_Coordinate - b.X_Coordinate, 2) + POWER(a.Y_Coordinate - b.Y_Coordinate, 2))
      ) AS Cost
    FROM vehicle v
    JOIN location a ON a.Location_Name = ?
    JOIN location b ON b.Location_Name = ?
    GROUP BY v.Type
    ORDER BY Cost;
  `

  connection.query(query, [SourceName, DestinationName], (err, results) => {
    if (err) {
      console.error('❌ Error executing query:', err)
      return res.status(500).json({ message: 'Error fetching prices' })
    }
    res.json(results)  // Send all vehicle prices as response
  })
})

// app.post('/RequestRide', jsonParser, function (req, res) {
//   console.log(req.body)
//   let sql =
//     "Insert Into ride(Status,Customer_Id,Start_time,End_Time,Date,Payment_method,SourceName,DestinationName,Vehicle_Type) values('REQUESTED'," +
//     req.body.Customer_Id +
//     ",'" +
//     req.body.Start_time +
//     "','" +
//     req.body.End_Time +
//     "','" +
//     req.body.Date +
//     "','" +
//     req.body.Payment_method +
//     "','" +
//     req.body.SourceName +
//     "','" +
//     req.body.DestinationName +
//     "','" +
//     req.body.Vehicle_Type +
//     "')"

//   connection.getConnection(function (err, connection) {
//     connection.query(sql, function (error, results, fields) {
//       if (error) {
//         console.log(error)
//       }
//       console.log(results)
//       sql = `Select * from ride where Ride_id=${results.insertId}`
//       connection.query(sql, function (error, results, fields) {
//         if (error) {
//           console.log(error)
//         }
//         console.log(results)
//         res.send(results)
//       })
//     })
//   })
// })
app.post('/RequestRide', jsonParser, function (req, res) {
  console.log(req.body);

  const {
    Customer_Id,
    Start_time,
    End_Time,
    Date,
    Payment_method,
    SourceName,
    DestinationName,
    Vehicle_Type,
    Cost
  } = req.body;

  const insertSql = `
    INSERT INTO ride (Status, Customer_Id, Start_time, End_Time, Date, Payment_method, SourceName, DestinationName, Vehicle_Type,Cost)
    VALUES ('REQUESTED', ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  connection.getConnection(function (err, conn) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database connection failed.');
    }

    conn.query(
      insertSql,
      [Customer_Id, Start_time, End_Time, Date, Payment_method, SourceName, DestinationName, Vehicle_Type,Cost],
      function (error, results) {
        if (error) {
          console.error(error);
          conn.release();
          return res.status(500).send('Error inserting ride.');
        }

        const rideId = results.insertId;

        // Distance update query
        const updateDistanceSql = `
          UPDATE ride r
          JOIN location src ON r.SourceName = src.Location_Name
          JOIN location dest ON r.DestinationName = dest.Location_Name
          SET r.Distance = SQRT(POWER(dest.X_Coordinate - src.X_Coordinate, 2) +
                                POWER(dest.Y_Coordinate - src.Y_Coordinate, 2))
          WHERE r.Ride_id = ?
        `;

        conn.query(updateDistanceSql, [rideId], function (err) {
          if (err) {
            console.error(err);
            conn.release();
            return res.status(500).send('Error updating distance.');
          }

          // Retrieve the inserted ride
          const selectSql = 'SELECT * FROM ride WHERE Ride_id = ?';
          conn.query(selectSql, [rideId], function (err, results) {
            conn.release();
            if (err) {
              console.error(err);
              return res.status(500).send('Error fetching ride details.');
            }

            console.log(results);
            res.send(results);
          });
        });
      }
    );
  });
});

app.get('/DriversWithNoRides', jsonParser, function (req, res) {
  // Using the SQL query from your image
  let sql = `
    SELECT d.Driver_id, d.Name
    FROM driver d
    LEFT JOIN ride r ON d.Driver_id = r.Driver_Id
    WHERE r.Ride_id IS NULL;
  `
  
  connection.getConnection(function (err, connection) {
    if (err) {
      console.error('Error getting connection from pool:', err)
      return res.status(500).send('Database connection error')
    }
    
    connection.query(sql, function (error, results, fields) {
      connection.release() // Release the connection back to the pool
      
      if (error) {
        console.error('Error executing query:', error)
        return res.status(500).send('Database query error')
      }
      
      console.log('Drivers with no rides:', results)
      res.send(results)
    })
  })
})
app.get('/CheckPropsedBooking', jsonParser, function (req, res) {
  console.log(req.body)
  let sql = 'select * from proposed_booking where Ride_id=42;'
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      console.log(results)
      res.send(results)
    })
  })
})

app.post('/SetProposedBooking', jsonParser, function (req, res) {
  console.log(req.body)
  let sql =
    "update ride set Status='BOOKED' where Ride_id=" + req.body.Ride_id + ';'
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      console.log(results)
      res.send(results)
    })
  })
})

app.post('/ViewPastRides', jsonParser, function (req, res) {
  console.log(req.body)
  let sql = 'select * from ride where Customer_Id=' + req.body.Customer_Id + ';'
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      console.log(results)
      res.send(results)
    })
  })
})
app.get('/TripsPerDriver', jsonParser, function (req, res) {
  console.log(req.body)

  const sql = `
    SELECT d.Driver_id, d.Name, COUNT(r.Ride_id) AS Total_Trips
    FROM driver d
    LEFT JOIN ride r ON d.Driver_id = r.Driver_Id
    GROUP BY d.Driver_id, d.Name
    ORDER BY Total_Trips DESC;
  `

  connection.getConnection(function (err, connection) {
    if (err) {
      console.log('Connection error:', err)
      res.status(500).send({ error: 'Database connection error' })
      return
    }

    connection.query(sql, function (error, results, fields) {
      connection.release()
      if (error) {
        console.log('Query error:', error)
        res.status(500).send({ error: 'Query execution failed' })
        return
      }

      console.log(results)
      res.send(results)
    })
  })
})

app.get('/RewardCategory', jsonParser, function (req, res) {
  const sql = `
    SELECT Driver_id, Name, Rating,
    CASE 
        WHEN Rating > 4.0 AND No_of_Trips > 2 THEN 'Gold'
        WHEN Rating > 3.5 AND No_of_Trips > 2 THEN 'Silver'
        WHEN Rating > 3.0 AND No_of_Trips > 1 THEN 'Bronze'
        ELSE NULL
    END AS Reward_Category
FROM driver
WHERE (Rating > 4.0 AND No_of_Trips > 2) 
   OR (Rating > 3.5 AND No_of_Trips > 2 AND NOT (Rating > 4.0 AND No_of_Trips > 2)) 
   OR (Rating > 3.0 AND No_of_Trips > 1 AND NOT (Rating > 3.5 AND No_of_Trips > 2) AND NOT (Rating > 4.0 AND No_of_Trips > 2))
ORDER BY 
    CASE 
        WHEN Rating > 4.0 AND No_of_Trips > 2 THEN 1
        WHEN Rating > 3.5 AND No_of_Trips > 2 THEN 2
        WHEN Rating > 3.0 AND No_of_Trips > 1 THEN 3
    END, Rating DESC, No_of_Trips DESC;
  `

  connection.getConnection(function (err, connection) {
    if (err) {
      console.error('Connection error:', err)
      return res.status(500).send({ error: 'Database connection failed' })
    }

    connection.query(sql, function (error, results, fields) {
      connection.release()
      if (error) {
        console.error('Query execution error:', error)
        return res.status(500).send({ error: 'SQL query failed' })
      }

      console.log('Reward category results:', results)  // ✅ DEBUG print
      res.send(results)
    })
  })
})

app.post('/CurrentRide', jsonParser, function (req, res) {
  console.log(req.body)
  //SELECT * FROM ride WHERE Customer_Id = 302 ORDER BY Start_time LIMIT 1;
  let sql =
    'select * from ride where Customer_Id=' +
    req.body.Customer_Id +
    " and Status!='COMPLETED' order by Start_time limit 1;"
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      console.log(results)
      res.send(results)
    })
  })
})
app.post('/VerifyOTPTransaction', jsonParser, function (req, res) {
  console.log(req.body);

  const Ride_id = req.body.Ride_id;
  const OTP = req.body.OTP;

  if (!Ride_id || !OTP) {
    return res.status(400).json({ error: 'Ride_id and OTP are required' });
  }

  let sql = `
    UPDATE ride 
    SET Status = 'INPROGESS' 
    WHERE Ride_id = ${Ride_id} 
      AND OTP = ${OTP} 
      AND Status = 'BOOKED';
  `;

  connection.getConnection(function (err, connection) {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ error: 'Database connection error' });
    }

    connection.query(sql, function (error, results, fields) {
      connection.release();

      if (error) {
        console.error('Query error:', error);
        return res.status(500).json({ error: 'Database query error' });
      }

      console.log('OTP verification result:', results);
      if (results.affectedRows === 1) {
        res.json({ success: true, message: 'OTP verified, ride booked' });
      } else {
        res.json({ success: false, message: 'Invalid OTP or Ride not in REQUESTED state' });
      }
    });
  });
});

app.post('/DriverCurrentRide', jsonParser, function (req, res) {
  const { Driver_Id } = req.body
  console.log('Received Driver_Id:', Driver_Id)

  if (!Driver_Id) {
    return res.status(400).json({ error: 'Driver_Id is required' })
  }

  let sql = `SELECT * FROM ride WHERE Driver_Id = ? AND Status != 'COMPLETED' ORDER BY Start_time LIMIT 1`

  connection.getConnection(function (err, conn) {
    if (err) {
      console.error('Connection error:', err)
      return res.status(500).send('Database connection error')
    }

    conn.query(sql, [Driver_Id], function (error, results) {
      conn.release() // Release the connection back to the pool

      if (error) {
        console.error('Query error:', error)
        return res.status(500).send('Query error')
      }

      console.log('Query results:', results)
      res.send(results)
    })
  })
})
app.post('/RateRide', jsonParser, (req, res) => {
  const { Ride_id, Rating } = req.body;

  if (!Ride_id || !Rating || Rating < 1 || Rating > 5) {
    return res.status(400).json({ success: false, message: 'Invalid Ride ID or Rating' });
  }

  connection.getConnection((err, conn) => {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ success: false, message: 'Database connection error' });
    }

    // Step 1: Get current Driver_Id and existing Driver stats
    const getDriverInfo = `
      SELECT r.Driver_Id, d.Rating AS previousRating, d.No_of_Trips
      FROM ride r
      JOIN driver d ON r.Driver_Id = d.Driver_Id
      WHERE r.Ride_id = ?;
    `;

    conn.query(getDriverInfo, [Ride_id], (err, driverResults) => {
      if (err || driverResults.length === 0) {
        conn.release();
        console.error('Error fetching driver info:', err);
        return res.status(404).json({ success: false, message: 'Ride or Driver not found' });
      }

      const { Driver_Id, previousRating, No_of_Trips } = driverResults[0];
      const previousTrips = No_of_Trips;
      const newTrips = previousTrips ;
      const newRating = ((previousRating * previousTrips) + Rating) / newTrips;

      // Step 2.1: Update customer rating in ride table
      const updateRideQuery = 'UPDATE ride SET Customer_rating = ? WHERE Ride_id = ?';

      conn.query(updateRideQuery, [Rating, Ride_id], (err1) => {
        if (err1) {
          conn.release();
          console.error('Error updating ride rating:', err1);
          return res.status(500).json({ success: false, message: 'Error updating ride' });
        }

        // Step 2.2: Update driver's rating and trip count
        const updateDriverQuery = 'UPDATE driver SET Rating = ?, No_of_Trips = ? WHERE Driver_Id = ?';

        conn.query(updateDriverQuery, [newRating, newTrips, Driver_Id], (err2) => {
          conn.release();
          if (err2) {
            console.error('Error updating driver rating:', err2);
            return res.status(500).json({ success: false, message: 'Error updating driver info' });
          }

          return res.json({
            success: true,
            message: 'Rating submitted successfully',
            Driver_Id,
            previousRating,
            previousTrips,
            newRating: newRating.toFixed(2),
          });
        });
      });
    });
  });
});


app.post('/RideBookingTransaction', jsonParser, function (req, res) {
  console.log(req.body)
  /*
  Start Transaction ;
Select a.Location_Name,b.Location_Name,Type,sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2)) as Distance,
Case
	When Type='Go' Then 7.8*sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2))
    When Type='Prime' Then 10.6*sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2))
    When Type='XL' Then 14.5*sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2))
    When Type='Moto' Then 3.6*sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2))
    When Type='Lux' Then 20*sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2))
end as Cost
from vehicle
Join location a on a.Location_Name='Hauz Khas'
Join location b on b.Location_Name='IIIT Delhi'
group by Type;
Insert into ride(Customer_Id,Status,Date,Start_time,End_time,Payment_method,SourceName,DestinationName,Vehicle_Type) values(143,'REQUESTED','2023-02-21','04:22:21','05:22:01','Wallet','IIIT Delhi','Hauz Khas','Moto');
Commit;
*/
  let sql = 'Start Transaction ;'
  let sql1 =
    'Insert into ride(Customer_Id,Status,Date,Start_time,End_time,Payment_method,SourceName,DestinationName,Vehicle_Type) values(' +
    req.body.Customer_Id +
    ",'REQUESTED','" +
    req.body.Date +
    "','" +
    req.body.Start_time +
    "','" +
    req.body.End_Time +
    "','" +
    'Wallet' +
    "','" +
    req.body.SourceName +
    "','" +
    req.body.DestinationName +
    "','" +
    req.body.Vehicle_Type +
    "');"
  let sql3 = 'Commit;'
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      console.log(sql)
      console.log(results)
      connection.query(sql1, function (error, results, fields) {
        if (error) {
          console.log(error)
        }
        console.log(sql1)
        console.log(results)
        connection.query(sql3, function (error, results, fields) {
          if (error) {
            console.log(error)
          }
          console.log(sql3)
          console.log(results)
          res.send(results)
        })
      })
      // res.send(results)
    })
  })
})

app.post('/CancelRideTransaction', jsonParser, function (req, res) {
  console.log(req.body)
  /*
  Start transaction;
set @cc=0;
set @cust=NULL;
set @driv=NULL;
Select @cc:=Cost,@cust:=Customer_Id,@driv:=Driver_Id from ride where ride_id=152;
delete from ride where Ride_id=152;
delete from proposed_booking where Ride_id=152;
Update customer set Wallet=Wallet-@cc*(10/100) where Customer_id=@cust;
Update driver set Earnings=Earnings+@cc*(10/100) where Driver_id=@driv;
Commit;
*/
  let sql = 'Start transaction;'
  let sql1 = 'set @cc=0;'
  let sql2 = 'set @cust=NULL;'
  let sql3 = 'set @driv=NULL;'
  let sql4 =
    'Select @cc:=Cost,@cust:=Customer_Id,@driv:=Driver_Id from ride where ride_id=' +
    req.body.Ride_id +
    ';'
  let sql5 = 'delete from ride where Ride_id=' + req.body.Ride_id + ';'
  let sql6 =
    'delete from proposed_booking where Ride_id=' + req.body.Ride_id + ';'
  let sql7 =
    'Update customer set Wallet=Wallet-@cc*(10/100) where Customer_id=@cust;'
  let sql8 =
    'Update driver set Earnings=Earnings+@cc*(10/100) where Driver_id=@driv;'
  let sql9 = 'Commit;'
  connection.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error)
      }
      console.log(results)
      connection.query(sql1, function (error, results, fields) {
        if (error) {
          console.log(error)
        }
        console.log(results)
        connection.query(sql2, function (error, results, fields) {
          if (error) {
            console.log(error)
          }
          console.log(results)
          connection.query(sql3, function (error, results, fields) {
            if (error) {
              console.log(error)
            }
            console.log(results)
            connection.query(sql4, function (error, results, fields) {
              if (error) {
                console.log(error)
              }
              console.log(results)
              connection.query(sql5, function (error, results, fields) {
                if (error) {
                  console.log(error)
                }
                console.log(results)
                connection.query(sql6, function (error, results, fields) {
                  if (error) {
                    console.log(error)
                  }
                  console.log(results)
                  connection.query(sql7, function (error, results, fields) {
                    if (error) {
                      console.log(error)
                    }
                    console.log(results)
                    connection.query(sql8, function (error, results, fields) {
                      if (error) {
                        console.log(error)
                      }
                      console.log(results)
                      connection.query(sql9, function (error, results, fields) {
                        if (error) {
                          console.log(error)
                        }
                        console.log(results)
                        res.send(results)
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
app.post('/AcceptRideTransaction', jsonParser, function (req, res) {
  console.log('Received request body:', req.body);
  
  // Ensure required fields are present
  if (!req.body.Driver_Id || !req.body.Ride_id) {
    return res.status(400).send({ error: 'Both Driver_Id and Ride_id are required' });
  }

  // Get the database connection
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log('Connection error:', err);
      return res.status(500).send({ error: 'Database connection failed' });
    }
    
    // First query - Update status
    const updateStatusSql = 'UPDATE Ride SET Status = "BOOKED" WHERE Ride_Id = ?';
    connection.query(updateStatusSql, [req.body.Ride_id], function(error, statusResults) {
      if (error) {
        console.log('Status update error:', error);
        connection.release();
        return res.status(500).send({ error: 'Error updating ride status' });
      }
      
      console.log('Status update result:', statusResults);
      
      // Second query - Update driver ID
      const updateDriverSql = 'UPDATE Ride SET Driver_Id = ? WHERE Ride_Id = ?';
      connection.query(updateDriverSql, [req.body.Driver_Id, req.body.Ride_id], function(error, driverResults) {
        if (error) {
          console.log('Driver update error:', error);
          connection.release();
          return res.status(500).send({ error: 'Error assigning driver' });
        }
        
        console.log('Driver update result:', driverResults);
        
        // All done
        connection.release();
        res.status(200).send({ 
          success: true, 
          message: 'Ride successfully booked and assigned to driver'
        });
      });
    });
  });
});

// app.post('/ApplyCouponTransaction', jsonParser, function (req, res) {
//   console.log(req.body)
 
//   let sql = 'Start Transaction;'
//   let sql1 = 'SET @max_copoun=0;'
//   let sql2 = 'SET @c_code=NULL;'
//   let sql3 =
//     'Select @max_copoun:=max(Discount_percent),@c_code:=Coupon_ID from coupons where Customer_ID=' +
//     req.body.Customer_ID +
//     ' and curdate()<coupons.Expiry_Date group by Coupon_ID;'
//   let sql4 =
//     'Update Ride set Coupon_code=@c_code where Ride_id=' +
//     req.body.Ride_id +
//     ';'
//   let sql5 =
//     'Update ride inner join (Select coupons.Discount_percent as d from ride join coupons on coupons.Customer_ID=ride.Customer_id where ride.Ride_id=' +
//     req.body.Ride_id +
//     ') t1 On ride.Ride_id=' +
//     req.body.Ride_id +
//     ' set Cost= ((100-t1.d)/100)* Case When Vehicle_Type="Go" Then Distance*7.8 When Vehicle_Type="Prime" Then Distance*10.6 When Vehicle_Type="Moto" Then Distance*3.6 When Vehicle_Type="XL" Then Distance*14.5 When Vehicle_Type="Lux" Then Distance*20 End where Ride_id=' +
//     req.body.Ride_id +
//     ' And Coupon_Code is not null;'
//   let sql6 =
//     'Delete from coupons where Coupon_ID=@c_code and Customer_ID=' +
//     req.body.Customer_ID +
//     ';'
//   let sql7 = 'Commit;'
//   connection.getConnection(function (err, connection) {
//     connection.query(sql, function (error, results, fields) {
//       if (error) {
//         console.log(error)
//       }
//       console.log(sql)
//       console.log(results)
//       connection.query(sql1, function (error, results, fields) {
//         if (error) {
//           console.log(error)
//         }
//         console.log(sql1)
//         console.log(results)
//         connection.query(sql2, function (error, results, fields) {
//           if (error) {
//             console.log(error)
//           }
//           console.log(sql2)
//           console.log(results)
//           connection.query(sql3, function (error, results, fields) {
//             if (error) {
//               console.log(error)
//             }
//             console.log(sql3)
//             console.log(results)
//             connection.query(sql4, function (error, results, fields) {
//               if (error) {
//                 console.log(error)
//               }
//               console.log(sql4)
//               console.log(results)
//               connection.query(sql5, function (error, results, fields) {
//                 if (error) {
//                   console.log(error)
//                 }
//                 console.log(sql5)
//                 console.log(results)
//                 connection.query(sql6, function (error, results, fields) {
//                   if (error) {
//                     console.log(error)
//                   }
//                   console.log(sql6)
//                   console.log(results)
//                   connection.query(sql7, function (error, results, fields) {
//                     if (error) {
//                       console.log(error)
//                     }
//                     console.log(sql7)
//                     console.log(results)
//                     res.send(results)
//                   })
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// })
app.post('/ApplyCouponTransaction', jsonParser, function (req, res) {
  console.log(req.body);
  
  // Extract ride_id and customer_id from request body
  const rideId = req.body.Ride_id;
  const customerId = req.body.Customer_ID;
  
  // First, get and print all available coupons for this customer
  let couponListSql = `
    SELECT * FROM coupons 
    WHERE Customer_ID = ${customerId} 
    AND Expiry_Date >= (SELECT Date FROM ride WHERE Ride_id = ${rideId})
  `;
  
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }
    
    // Query to list all available coupons for the customer
    connection.query(couponListSql, function (error, coupons, fields) {
      if (error) {
        console.log("Error fetching available coupons:", error);
      } else {
        console.log("Available coupons for customer", customerId, ":");
        console.log(coupons);
      }
      
      // SQL query to find and apply best available coupon to the ride
      // AND update the cost based on the discount percentage
      let applyCouponSql = `
        UPDATE ride  
        INNER JOIN (  
            SELECT ride.Customer_id AS r,  
                  a.Discount_percent AS d,  
                  a.Expiry_Date AS exp,  
                  a.Coupon_id AS cc  
            FROM ride  
            JOIN coupons a ON a.Customer_ID = ride.Customer_id  
            WHERE ride.Ride_id = ${rideId}  
                  AND ride.Date <= a.Expiry_Date 
            ORDER BY Discount_percent DESC  
            LIMIT 1  
        ) t1  
        ON ride.Ride_id = ${rideId}  
        SET 
            Coupon_code = t1.cc,
            Cost = Cost - (Cost * t1.d / 100)  /* Apply discount to the cost */
        WHERE t1.cc IS NOT NULL;
      `;
      
      // Execute the query to apply the best coupon and update cost
      connection.query(applyCouponSql, function (error, results, fields) {
        if (error) {
          console.log("Error applying coupon:", error);
          connection.release();
          return res.status(500).json({ error: "Database query error" });
        }
        
        console.log("Apply coupon results:", results);
        
        // If a coupon was applied, retrieve the updated ride details
        if (results.affectedRows > 0) {
          let getRideDetailsSql = `
            SELECT Ride_id, Customer_id, Coupon_code, Cost, 
                  (SELECT Discount_percent FROM coupons WHERE Coupon_id = Coupon_code) AS Applied_Discount 
            FROM ride 
            WHERE Ride_id = ${rideId}
          `;
          
          connection.query(getRideDetailsSql, function(error, rideDetails, fields) {
            connection.release(); // Release the connection when done
            
            if (error) {
              console.log("Error fetching updated ride details:", error);
              return res.json({ 
                success: true, 
                message: "Coupon applied successfully, but couldn't fetch details",
                affectedRows: results.affectedRows 
              });
            }
            
            res.json({ 
              success: true, 
              message: "Coupon applied successfully and cost updated", 
              rideDetails: rideDetails[0] || null
            });
          });
        } else {
          connection.release(); // Release the connection when no coupon was applied
          res.json({ 
            success: false, 
            message: "No eligible coupon found or coupon already applied" 
          });
        }
      });
    });
  });
});
// app.post('/RideCompletionTransaction', jsonParser, function (req, res) {
//   console.log(req.body)
//   /*
// Start Transaction;
// Update customer
// join ride on Ride.Customer_Id=customer.Customer_id set Wallet=Wallet-Ride.Cost where customer.Customer_id=275;
// Update driver
// join ride on Ride.Driver_Id=driver.Driver_id set Earnings=Earnings+Ride.Cost where driver.Driver_id=30;
// Update customer
// join ride on Ride.Customer_Id=customer.Customer_id set Rating=(Rating*No_of_Trips+4.0)/(No_of_Trips+1) where customer.Customer_id=275;
// Update driver
// join ride on Ride.Driver_Id=driver.Driver_id set Rating=(Rating*No_of_Trips+4.0)/(No_of_Trips+1) where driver.Driver_id=30;
// Update customer
// join ride on Ride.Customer_Id=customer.Customer_id set No_of_Trips=No_of_Trips+1 where customer.Customer_id=275;
// Update driver
// join ride on Ride.Driver_Id=driver.Driver_id set No_of_Trips=No_of_Trips+1 where driver.Driver_id=30;
// Update ride set Status='COMPLETED' where ride_id=230
// Commit;
// */
//   let sql = 'Start Transaction;'
//   let sql1 =
//     'Update customer join ride on Ride.Customer_Id=customer.Customer_id set Wallet=Wallet-Ride.Cost where customer.Customer_id=' +
//     req.body.Customer_id +
//     ';'
//   let sql2 =
//     'Update driver join ride on Ride.Driver_Id=driver.Driver_id set Earnings=Earnings+Ride.Cost where driver.Driver_id=' +
//     req.body.Driver_id +
//     ';'
//   let sql3 =
//     'Update customer join ride on Ride.Customer_Id=customer.Customer_id set Rating=(Rating*No_of_Trips+4.0)/(No_of_Trips+1) where customer.Customer_id=' +
//     req.body.Customer_id +
//     ';'
//   let sql4 =
//     'Update driver join ride on Ride.Driver_Id=driver.Driver_id set Rating=(Rating*No_of_Trips+4.0)/(No_of_Trips+1) where driver.Driver_id=' +
//     req.body.Driver_id +
//     ';'
//   let sql5 =
//     'Update customer join ride on Ride.Customer_Id=customer.Customer_id set No_of_Trips=No_of_Trips+1 where customer.Customer_id=' +
//     req.body.Customer_id +
//     ';'
//   let sql6 =
//     'Update driver join ride on Ride.Driver_Id=driver.Driver_id set No_of_Trips=No_of_Trips+1 where driver.Driver_id=' +
//     req.body.Driver_id +
//     ';'
//   let sql7 =  'Update ride set Status="COMPLETED" where ride_id=' + req.body.Ride_id + ';'
//   let sql8 = 'Commit;'
//   connection.getConnection(function (err, connection) {
//     connection.query(sql, function (error, results, fields) {
//       if (error) {
//         console.log(error)
//       }
//       console.log(sql)
//       console.log(results)
//       connection.query(sql1, function (error, results, fields) {
//         if (error) {
//           console.log(error)
//         }
//         console.log(sql1)
//         console.log(results)
//         connection.query(sql2, function (error, results, fields) {
//           if (error) {
//             console.log(error)
//           }
//           console.log(sql2)
//           console.log(results)
//           connection.query(sql3, function (error, results, fields) {
//             if (error) {
//               console.log(error)
//             }
//             console.log(sql3)
//             console.log(results)
//             connection.query(sql4, function (error, results, fields) {
//               if (error) {
//                 console.log(error)
//               }
//               console.log(sql4)
//               console.log(results)
//               connection.query(sql5, function (error, results, fields) {
//                 if (error) {
//                   console.log(error)
//                 }
//                 console.log(sql5)
//                 console.log(results)
//                 connection.query(sql6, function (error, results, fields) {
//                   if (error) {
//                     console.log(error)
//                   }
//                   console.log(sql6)
//                   console.log(results)
//                   connection.query(sql7, function (error, results, fields) {
//                     if (error) {
//                       console.log(error)
//                     }
//                     console.log(sql7)
//                     console.log(results)
//                     connection.query(sql8, function (error, results, fields) {
//                       if (error) {
//                         console.log(error)
//                       }
//                       console.log(sql8)
//                       console.log(results)
//                       res.send(results)
//                     })
//                   })
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// })
app.post('/RideCompletionTransaction', jsonParser, async (req, res) => {
  const { Customer_id, Driver_id, Ride_id, Rating } = req.body

  const conn = await new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err)
      else resolve(conn)
    })
  }).catch(err => {
    console.error('Connection error:', err)
    return res.status(500).send({ success: false, message: 'Connection error' })
  })

  try {
    // Get previous stats
    const [customer] = await new Promise((resolve, reject) => {
      conn.query(`SELECT No_of_Trips, Rating FROM customer WHERE Customer_id = ?`, [Customer_id], (err, results) => {
        if (err) reject(err)
        else resolve(results)
      })
    })

    const prevTrips = customer.No_of_Trips
    const prevRating = customer.Rating
    const updatedTrips = prevTrips + 1
    const updatedRating = ((prevRating * prevTrips) + Rating) / updatedTrips

    const sqlStatements = [
      'START TRANSACTION;',
      `UPDATE customer JOIN ride ON ride.Customer_Id = customer.Customer_id
       SET Wallet = Wallet - ride.Cost WHERE customer.Customer_id = ${Customer_id};`,

      `UPDATE driver JOIN ride ON ride.Driver_Id = driver.Driver_id
       SET Earnings = Earnings + ride.Cost WHERE driver.Driver_id = ${Driver_id};`,

      `UPDATE customer SET Rating = ${updatedRating.toFixed(2)}, No_of_Trips = No_of_Trips + 1 
       WHERE Customer_id = ${Customer_id};`,

      `UPDATE driver SET No_of_Trips = No_of_Trips + 1 
       WHERE Driver_id = ${Driver_id};`,

      `UPDATE ride SET Status = 'COMPLETED' WHERE ride_id = ${Ride_id};`,
      'COMMIT;'
    ]

    const executeQueriesSequentially = (index = 0) => {
      if (index >= sqlStatements.length) {
        conn.release()
        return res.send({
          success: true,
          message: 'Ride completed',
          prevTrips,
          prevRating,
          updatedTrips,
          updatedRating,
        })
      }

      conn.query(sqlStatements[index], (err) => {
        if (err) {
          conn.release()
          return res.status(500).send({ success: false, message: 'Query error', error: err })
        }
        executeQueriesSequentially(index + 1)
      })
    }

    executeQueriesSequentially()

  } catch (error) {
    conn.release()
    console.error('Transaction error:', error)
    res.status(500).send({ success: false, message: 'Unexpected error', error })
  }
})



// Test DB connection once at startup
connection.getConnection(function (err, conn) {
  if (err) {
    console.error('❌ Failed to connect to the MySQL database:', err.message)
  } else {
    console.log('✅ Successfully connected to the MySQL database.')
    conn.release() // release the connection back to the pool
  }
})

// Starting our server.
app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000')
})
