import {Router, AppRouter} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, AppRouter)
export class App {

  constructor(router, appRouter){
    this.appRouter = appRouter;
    this.router = router;
  }

  configureRouter(config, router) {
    config.title = 'Task Manager';
    config.map([
      { route: [''], name: 'task-list',      moduleId: 'task-list',      nav: true, title: 'List' },
      { route: 'task/add',  name: 'task-add',        moduleId: 'task-add',  nav: true, title: 'Add' },
      { route: 'task/edit/:id',  name: 'task-edit',        moduleId: 'task-add',  nav: false, title: 'Edit' }
    ]);
    this.router = router; 
  }

  gotoHomeScreen(){
    this.appRouter.navigateToRoute('task-list')
  }

  gotoBack(){
    this.appRouter.navigateBack();
  }
  
  get activeRouteName(){
    if(this.router.navigation.length < 1) return '';

    let activeObj = (this.router.navigation.find(x => x.isActive));
    if(activeObj) {
      return activeObj['config']['name'];
    }

    return '';
  }
}
