class Food {
    constructor(){
        this.image = loadImage("Milk.png");
    }
    getFoodStock(){
        this.foodStock = database.ref("foodCount");
        this.foodStock.on("value", function (data) {
            this.foodStock = data.val();
        }); 
        }
    
    updateFoodStock(count){
        database.ref('/').update({
            foodCount: count
        })
    }
    deductFood(count){
        database.ref('/').update({
            foodCount: count
    })
}
    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image, x, y, 50, 50);
        if (this.foodStock !== 0) {
            for (let i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}
