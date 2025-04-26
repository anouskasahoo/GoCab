-- Triggers


-- 1)


delimiter |
CREATE TRIGGER update_distance Before INSERT ON ride
FOR EACH ROW
	Begin
	set NEW.Distance=(select sqrt(power((l1.X_Coordinate-l2.X_Coordinate),2)+power((l1.Y_Coordinate-l2.Y_Coordinate),2)) 
    from location l1,location l2
	where NEW.SourceName=l1.Location_Name And NEW.DestinationName=l2.Location_Name);
    set NEW.OTP=(SELECT FLOOR(RAND() * 10000));
end
|
delimiter ;    

-- 2)

delimiter |
create trigger book_ride after Update on ride for each row
        Begin
			Delete from proposed_booking pb
			where NEW.Ride_id=pb.Ride_id And New.Status='Booked' And Old.Status!='Booked';
end
|
delimiter ;

-- 3)

Create Trigger insert_into_pb after insert on ride 
for each row
insert into proposed_booking(Driver_Id,Ride_id) 
Select Driver_Id,NEW.Ride_id from vehicle where vehicle.Type=NEW.Vehicle_Type;

Drop Trigger insert_into_pb;

-- OLAP

-- 1)

SELECT 
    SourceName,Vehicle_Type,
    Count(Case when Month(Date)=1 then Ride_id end) as 'January',
    Count(Case when Month(Date)=2 then Ride_id end) as 'February',
    Count(Case when Month(Date)=3 then Ride_id end) as 'March',
    Count(Case when Month(Date)=4 then Ride_id end) as 'April',
    Count(Case when Month(Date)=5 then Ride_id end) as 'May',
	Count(Case when Month(Date)=6 then Ride_id end) as 'June',
	Count(Case when Month(Date)=6 then Ride_id end) as 'June',
	Count(Case when Month(Date)=7 then Ride_id end) as 'July',
	Count(Case when Month(Date)=8 then Ride_id end) as 'August',
	count(Case when Month(Date)=9 then Ride_id end) as 'September',
	Count(Case when Month(Date)=10 then Ride_id end) as 'October',
	count(Case when Month(Date)=11 then Ride_id end) as 'November',
	Count(Case when Month(Date)=12 then Ride_id end) as 'December'
    from ride
group by SourceName,Vehicle_Type
order by SourceName;

-- 2)

SELECT 
    Vehicle_Type, 
    Driver_Id, 
    SUM(Cost) AS TotalCost
FROM ride
where Status='COMPLETED'
Group By Vehicle_Type, Driver_Id, Customer_Id With ROllUP;

-- 3)

Select Year(Date) as Y,Month(Date) as M,Date,Sum(Cost) from ride
where Status='COMPLETED'
Group by Year(Date),Month(Date),Date with Rollup;

-- 4)

SELECT floor(Age/10)*10 as Age_Group, COUNT(Customer_id) as customer_count, AVG(No_of_Trips) as avg_trips
FROM customer
WHERE Home_Location = 'Hauz Khas'
GROUP BY floor(Age/10)*10;

