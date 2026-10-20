@IsTest
private class TestVerifyDate {
	@IsTest static void testCheckDates()
    {
        Date dateToday = Date.valueOf('2020-04-01');
        Date date10    = dateToday.addDays(10);
        System.AssertEquals(date10, VerifyDate.CheckDates(dateToday, date10));
        
        Date date30 = dateToday.addDays(31);
        System.assertEquals(dateToday, VerifyDate.CheckDates(dateToday, date30));
    }
}