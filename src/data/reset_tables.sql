PRAGMA foreign_keys = OFF;
DELETE FROM role;
DELETE FROM permission;
DELETE FROM role_prmissions;
DELETE FROM order_item;
DELETE FROM order;
UPDATE sqlite_sequence SET seq=0 WHERE name='role';
UPDATE sqlite_sequence SET seq=0 WHERE name='permission';
PRAGMA foreign_keys = ON;