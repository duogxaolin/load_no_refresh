<?php
// Kết nối cơ sở dữ liệu và thực hiện truy vấn để lấy dữ liệu sản phẩm
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Số sản phẩm hiển thị trên mỗi trang
$perPage = 10;

// Trang hiện tại (được gửi từ Ajax request)
$page = $_GET['page'];

// Tính toán vị trí bắt đầu và lấy dữ liệu sản phẩm từ cơ sở dữ liệu
$start = ($page - 1) * $perPage;
$query = "SELECT * FROM test LIMIT $start, $perPage";
$result = $conn->query($query);

// Lấy tổng số sản phẩm
$totalProductsQuery = "SELECT COUNT(*) as id FROM test";
$totalResult = $conn->query($totalProductsQuery);
$totalProducts = $totalResult->fetch_assoc()['id'];

// Trả về dữ liệu dưới dạng JSON
$products = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$response = array(
    'products' => $products,
    'totalPages' => ceil($totalProducts / $perPage)
);

header('Content-Type: application/json');
echo json_encode($response);
$conn->close();
?>
