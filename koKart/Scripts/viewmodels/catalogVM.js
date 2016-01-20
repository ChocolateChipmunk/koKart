"use strict";
var vm = (function () {
    var newProduct = Product("", "", "", "");

    var catalog = ko.observableArray([
        Product(1, "T-Shirt", 10.00, 20),
        Product(2, "Trousers", 20.00, 10),
        Product(3, "Shirt", 15.00, 20),
        Product(4, "Shorts", 5.00, 10),
    ]);

    var searchTerm = ko.observable("");

    var cart = ko.observableArray([]);

    var showCartDetails = function () {
        if (cart().length > 0) {
            $("#cartContainer").removeClass("hidden");
        }
    };

    var filteredCatalog = ko.computed(function () {
        if (!catalog()) {
            return [];
        }

        var filter = searchTerm().toLowerCase();

        if (!filter) {
            return catalog();
        }

        var filtered = ko.utils.arrayFilter(catalog(), function (item) {            
            var strProp = ko.unwrap(item["name"]).toLocaleLowerCase();
            return (strProp.indexOf(filter) > -1);
        });

        return filtered;
    });

    var cartHasProducts = ko.computed(function () {
        return cart().length > 0;
    });

    var addProduct = function (context) {
        var id = new Date().valueOf();
        var newProduct = Product(
            id,
            context.name(),
            context.price(),
            context.stock()
        );
        catalog.push(newProduct);
        clearNewProduct();
    };

    var clearNewProduct = function () {
        newProduct.name("");
        newProduct.price("");
        newProduct.stock("");
    };

    return {
        searchTerm: searchTerm,
        catalog: filteredCatalog,
        newProduct: newProduct,
        addProduct: addProduct,
        cartHasProducts: cartHasProducts,
        cart: cart,
        showCartDetails: showCartDetails
    };

})();
