let contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    console.log(value.split(",").join(""))
    return !isNaN(value.split(",").join("")) &&
            parseInt(Number(value.split(",").join(""))) == value.split(",").join("") &&
            !isNaN(parseInt(value.split(",").join(""), 10));
}
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                value = clickData.selectionText.split(",").join("")
                let newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(value)
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if(newTotal >= budget.limit){
                        let notifOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit Reached!",
                            message: "Uh oh! it lokks like your target limit has been surparsed by your spending"
                        };
                        chrome.notifications.create('limitNotif', notifOptions); 
                    }
                });
            })
        }
    }
})

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()})
})