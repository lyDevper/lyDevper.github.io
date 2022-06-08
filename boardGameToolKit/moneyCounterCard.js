var selectedCoin = null; // value of the selected coin
var selectedItem = null; // item-id of selected item

var coinValues = [1, 2, 5, 10, 20, 50, 100, 500, 1000, 5000];
for(value of coinValues) {
    let coinBtn = jqTemp($('#coin-template'), {value:value});
    $('#coins').append(coinBtn);
}

function coinBtnHandler(el) {
    el = $(el);
    let coinValue = el.attr('data-value');
    selectedCoin = parseInt(coinValue);
    $('#coins').find('.selectedCoin').removeClass('selectedCoin');
    el.addClass('selectedCoin');

    console.log(selectedCoin);
}
$('#coins').find(`[data-value="10"]`).click();

function increaseBtnHandler() {
    try {
        let item = counterRecords.find(item => item.itemId == selectedItem);
        item.value = parseFloat(item.value) + selectedCoin;
        render_records(counterRecords);
    }
    catch {
        console.log('No item selected');
    }    
}

function decreaseBtnHandler() {
    try {
        let item = counterRecords.find(item => item.itemId == selectedItem);
        item.value = parseFloat(item.value) - selectedCoin;
        render_records(counterRecords);
    }
    catch {
        console.log('No item selected');
    }
}

function setZeroBtnHandler() {
    if(selectedItem == null) {
        if(!confirm('Set all values to zero?'))
            return;
        
        for(let record of counterRecords)
            record.value = 0;
        render_records(counterRecords);
    }
    else {
        let item = counterRecords.find(item => item.itemId == selectedItem);
        item.value = 0;
        render_records(counterRecords);
    }
}

function itemClickHandler(el) {
    el = $(el);    
    selectedItem = el.attr('data-item-id');

    for(record of counterRecords)
        record.isSelected = false;
    let item = counterRecords.find(item => item.itemId == selectedItem);
    item.isSelected = true;

    $('#counterRecords').find('.selectedItem').removeClass('selectedItem');
    el.addClass('selectedItem');

    console.log(el.html(), selectedItem);
}

function deselectItems() {
    for(record of counterRecords)
        record.isSelected = false;
    selectedItem = null;
    render_records(counterRecords);
}
$('#moneyCounterBox, .counterTitle, .counterContent, .coinsDiv, .counterControllerDiv')
.on('click', function() {
    if(event.target != this) // prevent bubbling if the click is actually on a child
        return;
    deselectItems();
});


//-------------------------------------------------------------------
function render_records(records=[{}]) {
    $('#counterRecords').empty();
    for(let record of records) {
        let recordEl = jqTemp($('#record-template'), {...record});
        if(record.isSelected)
            recordEl.addClass('selectedItem');

        $('#counterRecords').append(recordEl);
        
        console.log(recordEl.html());
    }
    console.log(records);
}

var counterRecords = [{name:'Person 1', value:0, isSelected:false, itemId:genId()},
                {name:'Person 2', value:0, isSelected:false, itemId:genId()},
                {name:'Person 3', value:0, isSelected:false, itemId:genId()}];
render_records(counterRecords);

function itemNameChangedHandler(el) {    
    el = $(el);
    let itemId = el.attr('data-item-id');
    let item = counterRecords.find(item => item.itemId == itemId);
    item.name = el.val();
    render_records(counterRecords);
}

function itemValueChangedHandler(el) {
    el = $(el);
    let itemId = el.attr('data-item-id');
    let item = counterRecords.find(item => item.itemId == itemId);
    item.value = el.val();
    render_records(counterRecords);
}

function deleteItemHandler(el) {
    event.stopPropagation();
    
    el = $(el);
    let itemId = el.attr('data-item-id');
    let item = counterRecords.find(item => item.itemId == itemId);
    counterRecords.splice(counterRecords.indexOf(item), 1);
    render_records(counterRecords);
}

function addItemHandler() {
    counterRecords.push({name:'New Person', value:0, isSelected:false, itemId:genId()});
    render_records(counterRecords);
}
