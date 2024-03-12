<!DOCTYPE html>
<html>

<head>
    <title>My PHP Web Page</title>
</head>

<body>
    <h1>Welcome to my PHP Web Page!</h1>

    <?php
    $host = 'db';
    $user = 'root';
    $password = 'password';
    $database = 'my_db';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$database", $user, $password);
        // Set PDO to throw exceptions on error
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully";
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    ?>

</body>

</html>