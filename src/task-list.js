import {WebAPI} from 'web-api';
import {AppRouter} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(WebAPI, AppRouter)
export class TaskList {
    constructor(webApi, appRouter){
        this.title = ''
        this.webApi = webApi;
        this.appRouter = appRouter;
        this.tasks = [];
    }
    created(owningView, myView){
        console.log('created', owningView, myView);
        this.webApi.getTaskList().then(tasks => { 
            this.tasks = tasks; 
        }, err => { alert('some error occured')});
    }

    bind(bindingContext, overrideContext){
        console.log('bind', bindingContext, overrideContext);
    }

    attached(){
        console.log('attached');
    }

    detached(){
        console.log('detached');
    }

    unbind(){
        console.log('unbind');
    }


    gotoAddScreen(){
        this.appRouter.navigateToRoute('task-add')
    }

    navigateToEditScreen($e, taskId){
        this.appRouter.navigateToRoute('task-edit', {id:taskId});
    }

    delete(task){
        this.webApi.deleteTask(task).then(tasks => { 
            //this.tasks = tasks; 
        }, err => { alert('some error occured')});
    }
}