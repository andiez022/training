SELECT 'CREATE DATABASE bulletin'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'bulletin')\gexec
GRANT ALL PRIVILEGES ON DATABASE bulletin TO postgres;