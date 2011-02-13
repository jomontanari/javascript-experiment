describe("Different ways to construct JavaScript objects", function() {

    beforeEach(function() {

        this.addMatchers({
            toBeATypeOf:
                    function(expected) {
                        return typeof this.actual === expected;
                    }

        });
    });

    describe("singleton object in Javascript", function() {

        it("should be an object", function() {

            var youngFreeAndSingle = (function() {
                return {
                    foo: "Hello World"
                }
            })();

            expect(youngFreeAndSingle).toBeATypeOf("object");

        });

        it("should have a reference to the window in 'this'", function() {

            var youngFreeAndSingle = (function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            })();


            expect(youngFreeAndSingle.bar).toBe(window);

        });

        it("should throw an error if you try to instantiate with new", function() {

            var youngFreeAndSingle = (function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            })();

            try {
                var iShouldThrowAnError = new youngFreeAndSingle();
            }
            catch (ex) {
                expect(ex.name).toBe("TypeError");
                expect(ex.message).toBe("youngFreeAndSingle is not a constructor");
            }

        });

        it("should allow access to its public properties", function() {

            var youngFreeAndSingle = (function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            })();

            expect(youngFreeAndSingle.foo).toBe("Hello World");
        });

        it("should not allow access to its private properties from outside", function() {

            var youngFreeAndSingle = (function() {

                var privateFoo = "You can't see me";

                return {
                    foo: "Hello World",
                    bar: this
                }
            })();

            expect(youngFreeAndSingle.privateFoo).toBeUndefined();
        });

        it("should allow access to its private properties from within public functions", function() {

            var youngFreeAndSingle = (function() {

                var privateFoo = "You can't see me";

                return {
                    foo: function() {
                        privateFoo = privateFoo + " ... but now you can"
                    },
                    bar: function() {
                        return privateFoo;
                    }
                }
            })();

            youngFreeAndSingle.foo();

            expect(youngFreeAndSingle.bar()).toBe("You can't see me ... but now you can");
        });

    });

    describe("creating an object with new", function() {

        it("should be a function", function() {

            var newMeUpBaby = function() {
                this.foo = "Hello World";
                this.bar = this;
            };

            expect(newMeUpBaby).toBeATypeOf("function");
        });

        it("should create an object when called with new", function() {

            var newMeUpBaby = function() {
                this.foo = "Hello World";
                this.bar = this;
            }

            var newObject = new newMeUpBaby();

            expect(newObject).toBeATypeOf("object");
        });

        it("should return undefined if called without new", function() {

            var newMeUpBaby = function() {
                this.foo = "Hello World";
                this.bar = this;
            };

            var noObject = newMeUpBaby();

            expect(noObject).toBeUndefined();
        });

        it("should have a reference to itself in this", function() {

            var newMeUpBaby = function() {
                this.foo = "Hello World";
                this.bar = this;
            };

            var newObject = new newMeUpBaby();

            expect(newObject.bar).toBe(newObject);

        });

        it("should allow access to its public properties", function() {

            var newMeUpBaby = function() {
                this.foo = "Hello World";
                this.bar = this;
            };

            var newObject = new newMeUpBaby();

            expect(newObject.foo).toBe("Hello World");

        });


        it("should not allow access to its private properties from outside", function() {

            var newMeUpBaby = function() {

                var privateFoo = "You can't see me";

                this.foo = "Hello World";
                this.bar = this;
            };

            var newObject = new newMeUpBaby();

            expect(newObject.privateFoo).toBeUndefined();
        });

        it("should allow access to its private properties from within public functions", function() {

            var newMeUpBaby = function() {

                var privateFoo = "You can't see me";

                this.foo = function() {
                    privateFoo = privateFoo + " ... but now you can"
                };

                this.bar = function() {
                    return privateFoo;
                }
            };

            var newObject = new newMeUpBaby();
            newObject.foo();

            expect(newObject.bar()).toBe("You can't see me ... but now you can");
        });
    });

    describe("returning an object from a function", function() {

        it("should be a function", function() {

            var returnMe = function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            };

            expect(returnMe).toBeATypeOf("function");
        });

        it("should create an object when called", function() {
            var returnMe = function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            };

            var returnedObject = returnMe();

            expect(returnedObject).toBeATypeOf("object");
        });

        it("should throw an error when called with new", function() {
            var returnMe = function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            };

            try {
                var iShouldThrowAnError = new returnMe();
            }
            catch (ex) {
                expect(ex.name).toBe("TypeError");
                expect(ex.message).toBe("youngFreeAndSingle is not a constructor");
            }

        });

        it("should have a reference to the window in 'this'", function() {

            var returnMe = function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            };

            var returnedObject = returnMe();

            expect(returnedObject.bar).toBe(window);
        });

        it("should allow access to its public properties", function() {

            var returnMe = function() {
                return {
                    foo: "Hello World",
                    bar: this
                }
            };

            var returnedObject = returnMe();

            expect(returnedObject.foo).toBe("Hello World");

        });

        it("should not allow access to its private properties from outside", function() {

            var returnMe = function() {

                var privateFoo = "You can't see me";

                return {
                    foo: "Hello World",
                    bar: this
                }
            };

            var returnedObject = returnMe();

            expect(returnedObject.privateFoo).toBeUndefined();
        });

        it("should allow access to its private properties from within public functions", function() {

            var returnMe = function() {

                var privateFoo = "You can't see me";

                return {
                    foo: function() {
                        privateFoo = privateFoo + " ... but now you can"
                    },
                    bar: function() {
                        return privateFoo;
                    }
                }
            };

            var returnedObject = returnMe();
            returnedObject.foo();

            expect(returnedObject.bar()).toBe("You can't see me ... but now you can");
        });

    })
});
