


CREATE TABLE tickets
(
    ticket_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    museum_name    TEXT NOT NULL,
    person_name    TEXT NOT NULL,
    visit_date     DATE NOT NULL,
    payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
    museum_id      INTEGER,
    FOREIGN KEY (museum_id) REFERENCES museums (id)
);

INSERT INTO tickets (museum_name,person_name,visit_date,payment_status,museum_id) VALUES ("Odisha State Museum (OSM)" , "Sabyasachi singh" , '2026-08-25' , 'paid' , 1);
