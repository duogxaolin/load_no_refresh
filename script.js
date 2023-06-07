$(document).ready(function() {
    var page = 1;
    var totalPages = 1;
    var displayedPages = 10; // Số liên kết phân trang hiển thị

    // Hàm tải dữ liệu sản phẩm từ máy chủ và cập nhật giao diện
    function loadProducts(page) {
        $.ajax({
            url: 'load_products.php',
            type: 'GET',
            data: { page: page },
            dataType: 'json',
            success: function(response) {
                var productList = $('#product-list');
                productList.empty();

                // Xử lý dữ liệu sản phẩm và cập nhật giao diện
                for (var i = 0; i < response.products.length; i++) {
                    var product = response.products[i];
                    var productItem = '<div class="product">' + product.name_type + '</div>';
                    productList.append(productItem);
                }

                // Tạo phân trang
                totalPages = response.totalPages;
                createPagination(totalPages, page);
            }
        });
    }

    // Hàm tạo các liên kết phân trang và xử lý sự kiện khi nhấp vào
    function createPagination(totalPages, currentPage) {
        var pagination = $('#pagination');
        pagination.empty();

        var startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
        var endPage = Math.min(totalPages, startPage + displayedPages - 1);

        if (startPage > 1) {
            var firstPageLink = '<a href="#" class="page-link" data-page="1">First</a>';
            pagination.append(firstPageLink);
        }

        if (currentPage > 1) {
            var prevPageLink = '<a href="#" class="page-link" data-page="' + (currentPage - 1) + '">Previous</a>';
            pagination.append(prevPageLink);
        }

        for (var i = startPage; i <= endPage; i++) {
            var pageLink = '<a href="#" class="page-link" data-page="' + i + '">' + i + '</a>';
            pagination.append(pageLink);
        }

        if (currentPage < totalPages) {
            var nextPageLink = '<a href="#" class="page-link" data-page="' + (currentPage + 1) + '">Next</a>';
            pagination.append(nextPageLink);
        }

        if (endPage < totalPages) {
            var lastPageLink = '<a href="#" class="page-link" data-page="' + totalPages + '">Last</a>';
            pagination.append(lastPageLink);
        }

        // Xử lý sự kiện nhấp vào liên kết phân trang
        $('.page-link').click(function() {
            var page = $(this).data('page');
            loadProducts(page);
        });
    }

    // Ban đầu tải dữ liệu và tạo phân trang
    loadProducts(page);
});