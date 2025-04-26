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