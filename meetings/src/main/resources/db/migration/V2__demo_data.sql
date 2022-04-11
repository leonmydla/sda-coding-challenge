INSERT INTO person (id, name)
VALUES (1, 'John Doe'),
       (2, 'Jane Doe'),
       (3, 'Max Mustermann'),
       (4, 'Erika Mustermann');

INSERT INTO public.meeting (person_id, date_time, coordinates)
VALUES (1, '2022-04-01 00:00:00.000000', 'test cords'),
       (2, '2022-04-02 00:00:00.000000', 'test cords'),
       (3, '2022-04-03 00:00:00.000000', 'test cords'),
       (4, '2022-04-04 00:00:00.000000', 'test cords'),
       (1, '2022-04-05 00:00:00.000000', 'test cords'),
       (3, '2022-04-06 00:00:00.000000', 'test cords'),
       (2, '2022-04-07 00:00:00.000000', 'test cords'),
       (4, '2022-04-08 00:00:00.000000', 'test cords'),
       (1, '2022-04-09 00:00:00.000000', 'test cords'),
       (3, '2022-04-10 00:00:00.000000', 'test cords'),
       (1, '2022-04-11 00:00:00.000000', 'test cords');
