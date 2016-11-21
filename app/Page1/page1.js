'use strict';

// const base = 'http://localhost:53406/api/Thesaurus';
const base = 'http://demo7762620.mockable.io';

//Обэкт який предоставляє роути
const routes = {
    GetWords: `${base}/GetWords`,
    AddSynonyms: `${base}/AddSynonyms`,
    GetSynonyms: (word) => `${base}/GetSynonym?word=${word}`
};


angular.module('myApp.page1', ['ngRoute'])
    //конфігурація роутера
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Page1', {
            templateUrl: '/tpl1.html',
            controller: 'ThesaurusController', //Назва контроллера
            controllerAs: 'ctrl' //аліас контроллера для вьюхи
        });
    }])

    .service('ThesaurusService', ['$http', function ($http) {
        const getWords = () => {
            return $http.get(routes.GetWords).then(({data}) => data).catch(() => {
                console.log('can not get words');
            });
        };

        const addSynonyms = (synonymsString) => {
            const synonyms = synonymsString.split(',').map(word => word.trim()).filter(word => word !== '');
            return $http.post(routes.AddSynonyms, synonyms).catch(() => {
                console.log('can not add synonyms');
            });
        };

        const GetSynonyms = (word = 'test') => {
            return $http.get(routes.GetSynonyms(word.trim())).then(({data}) => data).catch(() => {
                console.log('Can not get synonyms');
            });
        };

        //Обновляэмо апи сервиса
        Object.assign(this, {getWords, addSynonyms, GetSynonyms});
    }])
    .controller('ThesaurusController', [ 'ThesaurusService', function (ThesaurusService) {
        //використовуэмо контроллер як ViewModel
        const vm = this;
        Object.assign(vm, {
            //початкова ініціалізація
            word: '',
            inputSynonyms: '',
            words: [],
            added: false,

            //апі контроллера
            Load,
            Add,
            GetSynonyms
        });

        Load(); //початкова загрузка

        function Load() {
            ThesaurusService.getWords().then((data) => {
                vm.added = false;
                vm.words = data;
            });
        }


        function Add() {
            ThesaurusService.addSynonyms(vm.inputSynonyms).then(() => {
                vm.added = true;
            });
        }

        function GetSynonyms() {
            ThesaurusService.GetSynonyms(vm.word).then((data) => {
                vm.words = data;
                vm.added = false;
            });
        }
    }]);