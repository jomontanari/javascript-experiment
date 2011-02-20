describe("parent and child object relationships", function() {

    it("should have access to public methods and properties", function() {

        var Dog = function() {
            this.sound = "Woof";
        }

        var Mongrel = function() {
        }
        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var jess = new Mongrel();

        expect(jess.sound).toBe("Woof");
    });

    it("should not have access to private methods and properties", function() {

        var Dog = function() {

            this.sound = "Woof";

            var makeNoise = function() {
                alert("woof, woof");
            }
        }

        var Mongrel = function() {

            this.run = function() {
                makeNoise();
            }
        }
        Mongrel.prototype = new Dog();
        Mongrel.prototype.constructor = Mongrel;

        var jess = new Mongrel();

        try {
            jess.run();
        } catch (ex) {
            expect(ex.name).toBe("ReferenceError")
        }
    });
});