<?php
require_once 'mpIdentifier.php';

try {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_PERSISTENT => true
    ];
    
    $pdo = new PDO(MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, $options);
    
    // 1. Requête simple avec fetch()
    $stmt = $pdo->query("SELECT * FROM Index LIMIT 1");
    $result = $stmt->fetch();
    echo "1. Requête simple :\n";
    print_r($result);
    
    // 2. Requête avec paramètres nommés
    $id = 1;
    $stmt = $pdo->prepare("SELECT * FROM Index WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $result = $stmt->fetch();
    echo "\n2. Requête avec paramètre nommé :\n";
    print_r($result);
    
    // 3. Requête avec plusieurs paramètres
    $stmt = $pdo->prepare("SELECT * FROM Index WHERE id = :id AND active = :active");
    $stmt->execute([
        'id' => $id,
        'active' => 1
    ]);
    $result = $stmt->fetch();
    echo "\n3. Requête avec plusieurs paramètres :\n";
    print_r($result);
    
    // 4. Requête avec IN
    $ids = [1, 2, 3];
    $placeholders = str_repeat('?,', count($ids) - 1) . '?';
    $stmt = $pdo->prepare("SELECT * FROM Index WHERE id IN ($placeholders)");
    $stmt->execute($ids);
    $results = $stmt->fetchAll();
    echo "\n4. Requête avec IN :\n";
    print_r($results);
    
    // 5. Insertion sécurisée
    $data = [
        'titre' => 'Nouveau titre',
        'description' => 'Description test',
        'active' => 1
    ];
    $columns = implode(', ', array_keys($data));
    $values = implode(', ', array_fill(0, count($data), '?'));
    $stmt = $pdo->prepare("INSERT INTO Index ($columns) VALUES ($values)");
    $stmt->execute(array_values($data));
    echo "\n5. Insertion réussie, ID : " . $pdo->lastInsertId() . "\n";
    
    // 6. Mise à jour sécurisée
    $id = 1;
    $data = [
        'titre' => 'Titre modifié',
        'active' => 0
    ];
    $set = implode(' = ?, ', array_keys($data)) . ' = ?';
    $stmt = $pdo->prepare("UPDATE Index SET $set WHERE id = ?");
    $values = array_values($data);
    $values[] = $id;
    $stmt->execute($values);
    echo "\n6. Mise à jour réussie\n";
    
    // 7. Transaction
    try {
        $pdo->beginTransaction();
        
        // Première opération
        $stmt = $pdo->prepare("INSERT INTO Index (titre, description) VALUES (?, ?)");
        $stmt->execute(['Titre 1', 'Description 1']);
        
        // Deuxième opération
        $stmt = $pdo->prepare("INSERT INTO Index (titre, description) VALUES (?, ?)");
        $stmt->execute(['Titre 2', 'Description 2']);
        
        $pdo->commit();
        echo "\n7. Transaction réussie\n";
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "\n7. Erreur dans la transaction : " . $e->getMessage() . "\n";
    }
    
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage() . "\n";
} 