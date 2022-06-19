class RanderCard {
    static records = [];

    static {
        RanderCard.init();
    }

    static init() {
        RanderCard.records = [{name:'Item 1', isSelected:true, itemId:genId(), isHit:false},
                            {name:'Item 2', isSelected:true, itemId:genId(), isHit:false},
                            {name:'Item 3', isSelected:true, itemId:genId(), isHit:false}];
        RanderCard.render_records(RanderCard.records);
        RanderCard.unHit();
    }

    constructor() {
        console.log('Constructed a RanderCard');
    }

    static render_records(records) {
        $('#randerRecords').empty();
        for(let record of records) {
            let recordEl = jqTemp($('#randerRecord-template'), {...record});
            if(record.isSelected) {
                recordEl.addClass('randerSelectedItem');
                //let checkBox = recordEl.find('input[type=checkbox]');
                //checkBox.prop('checked', true);
            }
            else {
                let checkBox = recordEl.find('[class=randerCheckbox]');
                checkBox.empty();
            }

            if(record.isHit) {
                recordEl.addClass('randerHitItem');
            }

            $('#randerRecords').append(recordEl);
            //console.log(recordEl.html());
        }
        console.log('Rander render_records', records);
    }

    static toggleSelected(itemId) {
        let item = RanderCard.records.find(item => item.itemId == itemId);
        item.isSelected = !item.isSelected;
        RanderCard.render_records(RanderCard.records);
    }

    static itemClickHandler(el) {
        if(event.target != el) // prevent bubbling if the click is actually on a child
            return;

        RanderCard.toggleSelected($(el).attr('data-item-id'));
    }

    static itemCheckHandler(el) {
        console.log('checkbox clicked', $(el).prop('checked'));
        event.preventDefault();
        RanderCard.toggleSelected($(el).attr('data-item-id'));
    }

    static itemNameChangedHandler(el) {
        event.preventDefault();
        event.stopPropagation();
        
        let newNameVal = $(el).val();
        let itemId = $(el).attr('data-item-id');
        let changedItem = RanderCard.records.find(item => item.itemId == itemId);
        changedItem.name = newNameVal;
        RanderCard.render_records(RanderCard.records);
    }

    static selectAll() {
        RanderCard.unHit();
        RanderCard.records.forEach(item => item.isSelected = true);
        RanderCard.render_records(RanderCard.records);
    }

    static deselectAll() {
        RanderCard.unHit();
        RanderCard.records.forEach(item => item.isSelected = false);
        RanderCard.render_records(RanderCard.records);
    }
    
    static unHit() {
        RanderCard.records.forEach(item => item.isHit = false);
        RanderCard.render_records(RanderCard.records);
        $('#randerResultBtn').text('Click to Random');
        $('#randerResultBtn').css('background-color', '#E340A2');
    }

    static randAndShow() {
        let selectedItems = RanderCard.records.filter(item => item.isSelected);
        let hitItem = randChoice(selectedItems);
        $('#randerResultBtn').text(hitItem.name);

        var colors = ['#0eb591', '#326aed'];
        var num1 = 0;
        var num2 = RanderCard.records.length - 1;
        var numHit = RanderCard.records.indexOf(hitItem);
        var color = colorBetweenNum(colors, num1, num2, numHit);
        $('#randerResultBtn').css('background-color', color);

        RanderCard.records.forEach(item => item.isHit = false);
        hitItem.isHit = true;
        RanderCard.render_records(RanderCard.records);

        return hitItem;
    }
    static resultBtnHandler() {
        var selectedItems = RanderCard.records.filter(item => item.isSelected);
        if(selectedItems.length == 0) {
            console.log('Rander: No items selected');
            RanderCard.unHit();
            RanderCard.selectAll();
            return;
        }

        var hitItem;
        var i = 0;
        var randInterval = setInterval(function() {
            hitItem = RanderCard.randAndShow();
            i++;
            if(i > 16) { // after looping
                clearInterval(randInterval);
                setTimeout(afterRandom, 200);
            }
        }, 40);
        var afterRandom = function() {
            hitItem.isSelected = false;            
            //$('#randerRecords').find('[data-item-id="' + hitItem.itemId + '"]').removeClass('selectedItem');
            RanderCard.render_records(RanderCard.records);
            
            if(selectedItems.length == 1) {
                // only one item left                
            }
        }
    }

    //------------------------------------------------------
    static deleteItemHandler(el) {
        el = $(el);
        let itemId = el.attr('data-item-id');
        let item = RanderCard.records.find(item => item.itemId == itemId);
        RanderCard.records.splice(RanderCard.records.indexOf(item), 1);
        RanderCard.render_records(RanderCard.records);
    }

    static addItemHandler(el) {
        let newItem = {name:'New Item', isSelected:true, itemId:genId(), isHit:false};
        newItem.name = 'Item ' + (RanderCard.records.length + 1).toString();
        RanderCard.records.push(newItem);
        RanderCard.render_records(RanderCard.records);
    }

    static applyNumRangeBtnHandler() {
        RanderCard.unHit();
        var num1 = parseInt($('#randerInpNum1').val());
        var num2 = parseInt($('#randerInpNum2').val());
        if(num1 > num2) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        var newRecords = [];
        for(let i = num1; i <= num2; i++) {
            newRecords.push({name:i.toString(), isSelected:true, itemId:genId(), isHit:false});
        }
        RanderCard.records = newRecords;
        RanderCard.render_records(RanderCard.records);
    }

    static shuffleBtnHandler() {
        var i = 0;
        var loop = function() {
            RanderCard.records = shuffle(RanderCard.records);
            RanderCard.render_records(RanderCard.records);
            i++;
            if(i<16)
                setTimeout(loop, 40);
        }
        loop();
        
    }

    static clearBtnHandler() {
        if(!confirm('Clear all items?'))
            return;
        RanderCard.records = [{name:'Item 1', isSelected:true, itemId:genId(), isHit:false}];
        RanderCard.render_records(RanderCard.records);
    }

    static selectAllBtnHandler() {
        RanderCard.selectAll();
    }

    static deselectAllBtnHandler() {
        RanderCard.deselectAll();
    }
}