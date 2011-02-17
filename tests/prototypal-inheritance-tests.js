// To test:
// Constructor chain
// Prototype chain
// Overwriting properties
// Hiding private variables

describe("Prototypal Inheritance", function() {

    it("should use the same prototype for all objects of the same type when that type inherits from another prototype", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel"
        }

        function Mongrel() {
        }

        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var fido = new Mongrel();
        var rover = new Mongrel();

        expect(fido.prototype).toEqual(rover.prototype);
    });

    it("should reflect changes to the prototype in all child objects", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel"
        }

        function Mongrel() {
        }

        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var fido = new Mongrel();
        var rover = new Mongrel();

        Mongrel.prototype.sound = "grrr";

        expect(fido.sound).toBe("grrr");
        expect(rover.sound).toBe("grrr");
    });

    it("should not reflect changes made to the *prototype* of the parent function", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel"
        }

        function Mongrel() {
        }

        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var fido = new Mongrel();
        var rover = new Mongrel();

        Dog.prototype.sound = "grrr";

        expect(fido.sound).toBe("Woof");
        expect(rover.sound).toBe("Woof");
    });

    it("should not reflect changes made to the prototype when they are overridden in the object itself", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel"
        }

        Dog.prototype.sound = "grrr";

        var boris = new Dog();

        expect(boris.sound).toBe("Woof");
    });

    it("should get methods added to the prototype before the object is created", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel"
        }

        Dog.prototype.bark = function() {
            alert("Woof, Woof!");
        };

        var boris = new Dog();

        expect(boris.bark).toBeDefined();

    });

    it("should get methods added to the prototype after the object is created", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel"
        }

        var boris = new Dog();

        Dog.prototype.bark = function() {
            alert("Woof, Woof!");
        };

        expect(boris.bark).toBeDefined();

    });

    it("should only create one copy of the properties in the prototype object for all cloned (child) objects", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel";
            this.bones = [];
        }

        function Mongrel() {
        }

        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var max = new Mongrel();
        max.bones.push("chicken bone");

        var charlie = new Mongrel();
        charlie.bones.push("pork bone");

        expect(max.bones.length).toBe(2);
        expect(charlie.bones.length).toBe(2);
        expect(max.bones).toBe(charlie.bones);
    });

    it("should make a separate copy of the property for a child object when it's reassigned", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel";
            this.bones = [];
        }

        function Mongrel() {
        }

        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var max = new Mongrel();
        max.bones.push("chicken bone");

        var charlie = new Mongrel();
        charlie.bones = [];
        charlie.bones.push("pork bone")

        expect(max.bones.length).toBe(1);
        expect(charlie.bones.length).toBe(1);
        expect(max.bones).not.toEqual(charlie.bones);

    });

    it("should do something weird if you don't assign the constructor", function() {

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel";
            this.bones = [];
        }

        function Mongrel() {
        }

        Mongrel.prototype = new Dog();

        var jack = new Mongrel();
        var rocky = new Mongrel();
        jack.bones.push("chicken bone");
        rocky.bones.push("pork bone");

        expect(jack.constructor).toBe(Dog);

        console.log(jack.bones);
        console.log(rocky.bones);
        console.log(Mongrel.constructor);

        expect(true).toBeFalsy(); // because this is not yet finished

    });

    it("should call the superclass constructor if it is instantiated within the prototype chain - even if no objects are created", function() {

        var dogHasBeenInstantiated = false;

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel";
            dogHasBeenInstantiated = true;
        }


        function Mongrel() {}
        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        expect(dogHasBeenInstantiated).toBeTruthy();

    });

    it("should avoid calling the superclass constructor by having an intermediate class in the prototype chain", function() {

        var dogHasBeenInstantiated = false;

        function Dog() {
            this.sound = "Woof";
            this.type = "Mongrel";
            dogHasBeenInstantiated = true;
        }

        var f = function() {};
        f.prototype = Dog.prototype;

        function Mongrel() {}
        Mongrel.prototype = new f();
        Mongrel.prototype.constructor = Mongrel;

        var rocky = new Mongrel();

        expect(dogHasBeenInstantiated).toBeFalsy();

    });

});