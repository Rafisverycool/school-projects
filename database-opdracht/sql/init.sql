CREATE TABLE IF NOT EXISTS inzendingen (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    naam        VARCHAR(255),
    email       VARCHAR(255),
    school      TEXT,
    opleiding   TEXT,
    hobbys      TEXT,
    opmerkingen TEXT,
    aangemaakt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);