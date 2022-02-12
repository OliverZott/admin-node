PRAGMA foreign_keys = OFF;
DELETE FROM role;
DELETE FROM permission;
DELETE FROM role_prmissions;
UPDATE sqlite_sequence SET seq=0 WHERE name='role';
UPDATE sqlite_sequence SET seq=0 WHERE name='permission';
PRAGMA foreign_keys = ON;