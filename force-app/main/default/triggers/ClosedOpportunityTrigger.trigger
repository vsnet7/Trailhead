trigger ClosedOpportunityTrigger on Opportunity (before insert, after update) {
	List<Task> taskList = new List<Task>();
    
    for (Opportunity opp : Trigger.New)
    {
        if (opp.StageName == 'Closed Won')
        {
            Task newTask = new Task(subject='Follow Up Test Task', WhatId = opp.Id);
            taskList.add(newTask);
        }
    }
    
    if (taskList.size() > 0) {
        insert taskList;
    }
}