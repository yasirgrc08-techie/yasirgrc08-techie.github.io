CREATE TABLE IF NOT EXISTS paid_orders (
    order_key TEXT PRIMARY KEY,
    payment_id TEXT NOT NULL UNIQUE,
    site_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    amount_minor INTEGER NOT NULL CHECK (amount_minor > 0),
    currency TEXT NOT NULL CHECK (currency = 'INR'),
    provider_created_at INTEGER NOT NULL,
    recorded_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS paid_orders_site ON paid_orders (site_id);

CREATE TRIGGER IF NOT EXISTS paid_orders_no_delete
BEFORE DELETE ON paid_orders
BEGIN
    SELECT RAISE(ABORT, 'Paid order history is append-only');
END;

CREATE TRIGGER IF NOT EXISTS paid_orders_no_update
BEFORE UPDATE ON paid_orders
BEGIN
    SELECT RAISE(ABORT, 'Paid order history is append-only');
END;