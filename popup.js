$(function(){
    chrome.storage.sync.get(['total','limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            let newTotal = 0;
            console.log(newTotal)
            if (budget.total){
                newTotal += parseInt(budget.total);
            }
            let amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){
                if(amount && newTotal > budget.limit){
                    let notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit Reached!",
                        message: "Uh oh! it lokks like your target limit has been surparsed by your spending"
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        })
    });
});
