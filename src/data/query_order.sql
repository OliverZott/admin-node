SELECT STRFTIME('%Y-%m-%d', o.created_at) as date, SUM(oi.price * oi.quantity) as sum
FROM "order"  o 
JOIN order_item oi on o.id = oi.order_id
GROUP BY date;