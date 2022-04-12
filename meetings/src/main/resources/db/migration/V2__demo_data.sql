INSERT INTO person (name)
VALUES ('John Doe'),
       ('Jane Doe'),
       ('Max Mustermann'),
       ('Erika Mustermann');

INSERT INTO public.meeting (person_id, date_time, coordinates)
VALUES (1, '2022-04-01 12:36:23.000000', 'test cords'),
       (2, '2022-04-02 03:15:54.000000', 'test cords'),
       (3, '2022-04-03 15:02:03.000000', 'test cords'),
       (4, '2022-04-04 09:26:22.000000', 'test cords'),
       (1, '2022-04-05 22:51:34.000000', 'test cords'),
       (3, '2022-04-06 12:36:23.000000', 'test cords'),
       (2, '2022-04-07 03:15:54.000000', 'test cords'),
       (4, '2022-04-08 15:02:03.000000', 'test cords'),
       (1, '2022-04-09 09:26:22.000000', 'test cords'),
       (3, '2022-04-10 22:51:34.000000', 'test cords'),
       (1, '2022-04-11 12:36:23.000000', 'test cords');
