import {HttpClient} from 'aurelia-fetch-client';

let id = 0;
let tasks = [];
let client = new HttpClient();

function getId(){
  return ++id;
}

export class WebAPI {
  isRequesting = false;
  
  getTaskList() {
    let client = new HttpClient();

    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      if(tasks.length > 0) {
        resolve(tasks);
        this.isRequesting = false;
        return;
      }

      setTimeout( () =>{
        client.fetch('/json/data.json')
        .then(response => response.json())
        .then(data => {
            tasks =  data.map(d => {
                      d.id = getId();
                      d.isComplete = false;
                      return d
                    });
            resolve(tasks);
            this.isRequesting = false;
        });  
      }, 500)

    });
  }

  addTask(task){
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      task.id = getId();
      task.isComplete = false;
      setTimeout(()=>{
        tasks.push(task);
        resolve(task);
        this.isRequesting = false;
      }, 500)
    });
  }

  updateTask(task){
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        let index = tasks.findIndex(t => t.id == task.id);
        tasks[index] = task;
        resolve(task);
        this.isRequesting = false;
      }, 500)
    });
  }

 deleteTask(task){
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        let index = tasks.findIndex(t => t.id == task.id);
        tasks.splice(index, 1);
        //tasks[index] = task;
        resolve(task);
        this.isRequesting = false;
      }, 500)
    });
  }

  getTask(id){
    return new Promise((resolve, reject)=> {
      if(tasks.length==0) {
        this.getTaskList().then(tasks => {
          let task = tasks.find(task => task.id == id)
          resolve(task);
        });
      }else {
          let task = tasks.find(task => task.id == id)
          resolve(task);      }
    })
    //return tasks.find(task => task.id == id);
  }
}
