trigger AccountAddressTrigger on Account (before insert, after update) {
    for (Account a : Trigger.New) {
        if (a.Match_Billing_Address__c) {
            if (a.BillingPostalCode != '') {
                a.ShippingPostalCode = a.BillingPostalCode;
            }
            
        }
    }
}