class GameObj {
    static objList = [];    

    constructor() {
        GameObj.objList.push(this);
        //console.log('add', this)
        this.x = 0;
        this.y = 0;
    }

    update(ctx) {

    }

    render() {

    }

    forget() {
        GameObj.objList.splice(GameObj.objList.findIndex((obj)=>obj===this), 1);
    }
    destroy() {
        this.forget();
        delete this;
    }
}

class Collider extends GameObj {
    static objList = [];

    constructor() {
      super(); // Call the base class constructor
      this.m = 1;

      Collider.objList.push(this);
    }
  
    // Method to check for collisions with another collider
    collidesWith(other) {
        // Check if this collider overlaps with the other collider
        let d = Math.sqrt((this.x - other.x)**2 + (this.y - other.y)**2);
        if(d <= 8)
            return true;
        return false;
    
    }

    forget() {
        super.forget();
        Collider.objList.splice(Collider.objList.findIndex((obj)=>obj===this), 1);        
    }
}
