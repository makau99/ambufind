-----------------------------------------------------
-- HOSPITALS
-----------------------------------------------------

INSERT INTO hospitals
(name, county, address, latitude, longitude, phone)

VALUES

(
'Kenyatta National Hospital',
'Nairobi',
'Hospital Road, Upper Hill',
-1.3015000,
36.8070000,
'+254700000001'
),

(
'Moi Teaching and Referral Hospital',
'Uasin Gishu',
'Nandi Road, Eldoret',
0.5143000,
35.2698000,
'+254700000002'
),

(
'Coast General Teaching and Referral Hospital',
'Mombasa',
'Makadara Road',
-4.0435000,
39.6682000,
'+254700000003'
),

(
'Jaramogi Oginga Odinga Teaching and Referral Hospital',
'Kisumu',
'Kisumu City',
-0.1022000,
34.7617000,
'+254700000004'
);

-----------------------------------------------------
-- AMBULANCES
-----------------------------------------------------

INSERT INTO ambulances
(registration_number, vehicle_type)

VALUES

('KNH-AMB-001','Advanced Life Support'),

('KNH-AMB-002','Basic Life Support'),

('KNH-AMB-003','Advanced Life Support');