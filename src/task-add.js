import {Router, AppRouter} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {WebAPI} from 'web-api';

@inject(Router, AppRouter, WebAPI)
export class TaskAdd {

    priorityList = [
        { value: 'High', text: '1 - (High)' },
        { value: 'Medium', text: '2 - (Medium)' },
        { value: 'Low', text: '3 - (Low)' }

    ];
    departmentList = [
        { value: 'HR', text: 'HR' },
        { value: 'Facility', text: 'Facility' },
        { value: 'Payroll', text: 'Payroll' },
        { value: 'Others', text: 'Others' },
    ];
    
    constructor(router, appRouter, webApi){
        this.appRouter = appRouter;
        this.router = router;
        this.webApi = webApi;
    }

    activate(params, routeConfig){
       if(params.id) {
        this.type = 'edit';
        this.webApi.getTask(params.id).then(task => {
            this.original = task;
            this.task = JSON.parse(JSON.stringify(this.original));
        });
       }else {
        this.task = {};
        this.type = 'add';
       }

    }

    add(){
        this.webApi.addTask(this.task).then(task => {
            //emit event to update list
            this.appRouter.navigateToRoute('task-list')
        })
    }

    update(){
         this.webApi.updateTask(this.task).then(task => {
            //emit event to update list
            this.appRouter.navigateToRoute('task-list')
        })       
    }

    cancel(){
        this.appRouter.navigateToRoute('task-list')
    }
}