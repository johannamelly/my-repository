angular.module('myApp', [])

.controller('MyController', function($scope) {
    $scope.tasksUrgent=[];
    $scope.tasksNormal=[];
    $scope.tasksSecondaire=[];
    $scope.checkTask=[];
    $scope.test=0;
    $scope.iteration=0;

    $scope.done="undone";
        $scope.date={
            day:[1,2,3,4,5,6,7,8,9,10,11,12],
            //month:[{id:1, mois:"janvier"},"février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
            month:[1,2,3,4,5,6,7,8,9,10,11,12],
            year:[2016,2017,2018]
        };

    $scope.newtype=["urgent","normal","secondaire"];
    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate()+1;
    var y = q.getFullYear();

    var date = new Date(y,m,d);

        $scope.addTask=function(){
            $scope.mydate=new Date($scope.selectedY,$scope.selectedM-1,$scope.selectedD+1);
            console.log(date);
            console.log($scope.mydate);
            if(date>$scope.mydate)
            {
                $scope.dateLimite="Attention: passé!"
            }
            else
            {
                $scope.dateLimite=" "
            }

            //$scope.tasks.premier.push(task);
           // $scope.tasks.second.push(type);
            if($scope.type=="urgent"){
                $scope.tasksUrgent.push({tache:$scope.task, types:$scope.type, jour:$scope.selectedD, mois:$scope.selectedM,
                    annee:$scope.selectedY, deadline:$scope.dateLimite, taskDone:$scope.done});
                $scope.task=' ';
                $scope.type=' ';
            }
            if($scope.type=="normal"){
                $scope.tasksNormal.push({tache:$scope.task, types:$scope.type, jour:$scope.selectedD, mois:$scope.selectedM,
                    annee:$scope.selectedY, deadline:$scope.dateLimite, taskDone:$scope.done});
                $scope.task=' ';
                $scope.type=' ';
            }
            if($scope.type=="secondaire"){
                $scope.tasksSecondaire.push({tache:$scope.task, types:$scope.type, jour:$scope.selectedD, mois:$scope.selectedM,
                    annee:$scope.selectedY, deadline:$scope.dateLimite, taskDone:$scope.done});
                $scope.task=' ';
                $scope.type=' ';
            }
        };

        $scope.deleteTask=function(x,type){
            $scope.index=x;
            switch(type) {
                case "urgent":
                    $scope.tasksUrgent.splice($scope.index, 1);
                    break;
                case "normal":
                    $scope.tasksNormal.splice($scope.index, 1);
                    break;
                case "secondaire":
                    $scope.tasksSecondaire.splice($scope.index, 1);
                    break;
            }
        };

        $scope.checkTest=function(){

        };

        $scope.taskChecked=function(x,type,rem){

            if(rem==1) {
                //ajouter à la liste
                $scope.checkTask.push({numero: [x], ceType: [type]});
                $scope.test=$scope.checkTask;
            }else{
                for(var i=0;i<$scope.checkTask.length;i++){
                    //retirer de la liste
                    if(x==$scope.checkTask[i].numero){
                        //$scope.test2=i;
                        $scope.checkTask.splice(i,1);
                    }
                }
            }
        };

        $scope.removeTask=function(){
            for(var i=0;i<$scope.checkTask.length;i++){

                //récupérer index de la ligne à supprimer et convert to int
                $scope.x=$scope.checkTask[i].numero;
                $scope.index=$scope.x.toString();
                //-i car index baisse de 1 à chaque suppression dans tasksPriorité
                $scope.index=parseInt($scope.index)-i;

                //de quel tableau l'enlever et convert to String
                $scope.type=$scope.checkTask[i].ceType.toString();

                //$scope.tasksUrgent.splice($scope.index, 1);

                //suppression
                switch($scope.type) {
                    case "urgent":
                        $scope.tasksUrgent.splice($scope.index, 1);
                        $scope.test=$scope.index;
                        $scope.iteration++;
                        break;
                    case "normal":
                        $scope.tasksNormal.splice($scope.index, 1);
                        break;
                    case "secondaire":
                        $scope.tasksSecondaire.splice($scope.index, 1);
                        break;
                }
            }

            //vider tableau
            $scope.checkTask.splice(0,$scope.checkTask.length);
            $scope.test2=$scope.tasksUrgent;
        };

        $scope.changeType=function(index,type,nvtype){
            switch (nvtype){
                case "urgent":
                    //$scope.test="u";
                    switch(type) {
                        case "urgent":
                            //$scope.test="uu";
                            //ne change rien
                            //$scope.tasksUrgent[index].types.splice(0, 1, nvtype);
                            break;
                        case "normal":
                            //$scope.test="un";
                            //$scope.test=$scope.tasksNormal[index].types;
                            $scope.tasksNormal[index].types.splice(0, 1, nvtype);
                            $scope.test=4;
                            $scope.tasksUrgent.push($scope.tasksNormal[index]);
                            $scope.tasksNormal.splice(index,1);
                            break;
                        case "secondaire":
                            //$scope.test="us";
                            $scope.tasksSecondaire[index].types.splice(0, 1, nvtype);
                            $scope.tasksUrgent.push(tasksSecondaire[index]);
                            $scope.tasksSecondaire.splice(index,1);
                            break;
                }
                    break
                case "normal":
                    switch(type) {
                        case "urgent":
                            $scope.tasksUrgent[index].types.splice(0, 1, nvtype);
                            $scope.tasksNormal.push(tasksUrgent[index]);
                            $scope.tasksUrgent.splice(index, 1);
                            break;
                        case "normal":
                            //
                            break;
                        case "secondaire":
                            $scope.tasksSecondaire[index].types.splice(0, 1, nvtype);
                            $scope.tasksNormal.push(tasksSecondaire[index]);
                            $scope.tasksSecondaire.splice(index, 1);
                            break;
                    }
                    break
                case "secondaire":
                    switch(type) {
                        case "urgent":
                            $scope.tasksUrgent[index].types.splice(0, 1, nvtype);
                            $scope.tasksSecondaire.push(tasksUrgent[index]);
                            $scope.tasksUrgent.splice(index,1);
                            break;
                        case "normal":
                            $scope.tasksNormal[index].types.splice(0, 1, nvtype);
                            $scope.tasksSecondaire.push(tasksNormal[index]);
                            $scope.tasksNormal.splice(index, 1);
                            break;
                        case "secondaire":
                            //
                            break;
                    }
                    break
            }
        };
/*
        $scope.allDone=function(){

        }

    $scope.checkAll=function(cochee,removeLine){
        if(cochee==1){
            //$scope.removeLine.Selected=true;
            $scope.test2=removeLine;
        }else{
            //$scope.removeLine.Selected=false;
            $scope.test2=removeLine;
        }
    }
*/
    }
)
;