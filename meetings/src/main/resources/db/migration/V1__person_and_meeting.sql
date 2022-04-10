CREATE TABLE IF NOT EXISTS person (
    id   BIGSERIAL,
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS meeting (
    id          BIGSERIAL,
    person_id   BIGINT      NOT NULL,
    date_time   TIMESTAMP   NOT NULL,
    coordinates VARCHAR(64) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_meeting_person_id FOREIGN KEY (person_id) REFERENCES person (id) ON UPDATE RESTRICT ON DELETE RESTRICT
    );
