const {
    mobile
} = require('../models/mobile.model');
// ! filter applied on search

const filterSearch = async (req, res) => {
    try {
        const url = req.params.filterquery;
        const arr = url.split('&');
        let brand, ram, rom, query, location;
        arr.forEach(element => {
            if (element[0] === 'b')
                brand = element.replace('brand=', '');

            else if (element[0] === 'l')
                location = element.replace('location=', '');

            else if (element[1] === 'a')
                ram = element.replace('ram=', '');

            else if (element[1] === 'o')
                rom = element.replace('rom=', '');

        });

        if (brand)
            brand = brand.split(',');
        if (ram)
            ram = ram.split(',');
        if (rom)
            rom = rom.split(',');
        if (location)
            location = location.split(',');

        if (brand && ram && rom) {
            if (location[0] !== 'India')
                query = {
                    $and: [{
                        brand: brand
                    }, {
                        ram: ram
                    }, {
                        rom: rom
                    }, {
                        location: location
                    }]
                };
            else
                query = {
                    $and: [{
                        brand: brand
                    }, {
                        ram: ram
                    }, {
                        rom: rom
                    }]
                };
        } else if (brand && ram || brand && rom || ram && rom) {
            if (brand && ram) {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            brand: brand
                        }, {
                            ram: ram
                        }, {
                            location: location
                        }]
                    };
                else
                    query = {
                        $and: [{
                            brand: brand
                        }, {
                            ram: ram
                        }]
                    };
            } else if (brand && rom) {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            brand: brand
                        }, {
                            rom: rom
                        }, {
                            location: location
                        }]
                    };
                else
                    query = {
                        $and: [{
                            brand: brand
                        }, {
                            rom: rom
                        }]
                    };
            } else {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            ram: ram
                        }, {
                            rom: rom
                        }, {
                            location: location
                        }]
                    };
                else
                    query = {
                        $and: [{
                            ram: ram
                        }, {
                            rom: rom
                        }]
                    };
            }
        } else {
            if (brand) {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            brand: brand
                        }, {
                            location: location
                        }]
                    };
                else
                    query = {
                        $and: [{
                            brand: brand
                        }]
                    };
            } else if (ram) {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            ram: ram
                        }, {
                            location: location
                        }]
                    };
                else
                    query = {
                        $and: [{
                            ram: ram
                        }]
                    };
            } else if (rom) {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            rom: rom
                        }, {
                            location: location
                        }]
                    };
                else
                    query = {
                        $and: [{
                            rom: rom
                        }]
                    };
            } else {
                if (location[0] !== 'India')
                    query = {
                        $and: [{
                            location: location
                        }]
                    };
                else
                    query = {};
            }
        }
        const mobileList = await mobile.find(query);
        if (!mobileList) {
            res.status(500).send({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).send({
            message: 'success',
            data: mobileList,
            status: 200
        });
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }
};

module.exports = {
    filterSearch
};