// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

//test data:
// createCustomer =>  "1e8ffd7005b81ace8bbbf148f0af1fa7","Abhishek","9284903101"
//    "64dc070868dfd4098166a1848dc3b2f8" ,"987268389682", "raj",
// getCustomeDetails => 426614174000
// craeteReatiler => "fdea9301c28d13edc5de9cb7943cccbb", "tets retailer", "20.593683 78.962883"
//createCode => "92830","Adidas","This Is nike Shoes","292fdc84156e204259df3fe88014667a","20.593683 78.962883"

// Product custoructoer
//  struct Product{
//     address creator;
//     string productName;
//     uint256 productId;
//     string date;
//     string totalState;
//     mapping (uint256 => State) positions;
// }

// struct State{
//     string description;
//     address person;
// }

contract Authentifi {
    struct Customer {
        string name;
        string phone;
        string hashid;
        string[] codes;
    }
    struct Retailer {
        string name;
        string location;
        string hashid;
    }

    struct Productcode {
        string code;
        uint256 status;
        string brand;
        string description;
        string manufactuerhash;
        string manufactuerLocation;
        string retailer;
        string[] owner;
    }

    //
    mapping(string => Retailer) public retailer;
    mapping(string => Customer) public customers;
    mapping(string => Productcode) products;

    function createCustomer(
        string memory _id,
        string memory _name,
        string memory _phone
    ) public payable returns (uint256) {
        Customer memory newCustomer;
        newCustomer.name = _name;
        newCustomer.phone = _phone;
        newCustomer.hashid = _id;
        customers[_id] = newCustomer;
        // customers[_id] = Customer(_name, _phone, _id);
        return 1;
    }

    function getCustomeDetails(string memory _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        return (
            customers[_id].hashid,
            customers[_id].name,
            customers[_id].phone
        );
    }

    function createReatiler(
        string memory _id,
        string memory _name,
        string memory _location
    ) public payable returns (bool) {
        retailer[_id] = Retailer(_name, _location, _id);
        return true;
    }

    function getRetailerDetails(string memory _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        return (
            retailer[_id].hashid,
            retailer[_id].name,
            retailer[_id].location
        );
    }

    function createCode(
        string memory _code,
        string memory _brand,
        string memory _description,
        string memory _manufacturehash,
        string memory _manufactuerLocation
    ) public payable returns (uint256) {
        Productcode memory newProduct;
        newProduct.code = _code;
        newProduct.brand = _brand;
        newProduct.description = _description;
        newProduct.manufactuerhash = _manufacturehash;
        newProduct.manufactuerLocation = _manufactuerLocation;
        products[_code] = newProduct;

        // products[_code] = Productcode(_code, _status, _brand, _description, _manufacturehash, _manufactuerLocation, _retailer, []);
        return 1;
    }

    function getProductDeailes(string memory _code)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            products[_code].status,
            products[_code].brand,
            products[_code].description,
            products[_code].manufactuerhash,
            products[_code].manufactuerLocation,
            products[_code].retailer
            // products[_code].owner
        );
    }

    function getOwnedProductDetails(string memory _code)
        public
        view
        returns (string memory, string memory)
    {
        return (
            retailer[products[_code].retailer].name,
            retailer[products[_code].retailer].location
        );
    }

    function addRetailerToCode(string memory _code, string memory _retailerHash)
        public
        payable
        returns (uint256)
    {
        products[_code].retailer = _retailerHash;
        return 1;
    }

    function setInitialOwner(
        string memory _code,
        string memory _retailer,
        string memory _customer
    ) public payable returns (uint256) {
        if (compareStrings(products[_code].retailer, _retailer)) {
            if (compareStrings(customers[_customer].hashid, _customer)) {
                products[_code].owner.push(_customer);
                products[_code].status = 1;
                uint256 length = customers[_customer].codes.length;
                if (length == 0) {
                    customers[_customer].codes.push(_code);
                    customers[_customer].codes.push("hack");
                } else {
                    customers[_customer].codes[length - 1] = _code;
                    customers[_customer].codes.push("hack");
                }
                return 1;
            }
        }
        return 0;
    }

    function changeOwner(string memory _code, string memory _newCustomer, string memory _oldCustomer) public payable returns(uint){
        uint i;
        bool flag = false;
         //Creating objects for code,oldCustomer,newCustomer
         Productcode memory product = products[_code];
         uint len_product_owner = product.owner.length;
         //get old customer
         Customer memory oldCustomer = customers[_oldCustomer];
         uint len_old_customer_code = oldCustomer.codes.length;
         //get new Customer
         Customer memory newCustomer = customers[_newCustomer];
         
            //check if old customer is owner
            for(i = 0; i <= len_old_customer_code; i++ ){
                if(compareStrings(oldCustomer.codes[i], _code)){
                    flag = true;
                    break;
                }
            }
            
            if(flag == true){
                //swapping old cutomer to new customer in product owner
                for (i = 0; i <= len_product_owner; i++){
                    if(compareStrings(product.owner[i], _oldCustomer)){
                        products[_code].owner[i] = _newCustomer;
                        break;
                    }
                }
            }
            
            
            for(i = 0; i < len_old_customer_code; i++){
                if(compareStrings(customers[_oldCustomer].codes[i], _code)){
                    remove(i, customers[_oldCustomer].codes);
                    uint len_new_customer_code = customers[_newCustomer].codes.length;
                    if(len_new_customer_code == 0){
                        customers[_newCustomer].codes.push(_code);
                    }
                    else{
                        customers[_newCustomer].codes[len_new_customer_code - 1] = _code;
                    }
                }
                return 1;
            }
         
    }
    function getCodes(string memory _customer)
        public
        view
        returns (string[] memory)
    {
        return customers[_customer].codes;
    }

    function compareStrings(string memory a, string memory b)
        public
        view
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // Function to delete an element from an array
    function remove(uint256 index, string[] storage array)
        internal
        returns (bool)
    {
        if (index >= array.length) return false;

        for (uint256 i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        delete array[array.length - 1];
        return true;
    }
}
