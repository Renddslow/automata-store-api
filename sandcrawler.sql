-- Items table
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    msrp INT DEFAULT 0 NOT NULL,
    manufacturer VARCHAR(255),
    description BLOB,
    overview BLOB,
    warranty BLOB,
    image VARCHAR(255) NOT NULL
);

-- Item specs table
CREATE TABLE IF NOT EXISTS item_specs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    spec_value VARCHAR(255) NOT NULL
);

ALTER TABLE item_specs
    ADD CONSTRAINT item_specs__items
    FOREIGN KEY(item_id)
    REFERENCES items(id);
