'use strict';

// const base = 'http://localhost:53406/api/Thesaurus';
const base = 'http://demo7762620.mockable.io';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Page1', {
            templateUrl: '/tpl1.html',
            controller: 'ThesaurusController',
            controllerAs: 'ctrl'
        });
    }])
    .service('ThesaurusService', ['$http', function ($http) {
        const getWords = () => {
            return $http.get(`${base}/GetWords`).then(({data}) => data).catch(() => {
                console.log('can not get words');
            });
        };

        const addSynonyms = (synonymsString) => {
            const synonyms = synonymsString.split(',').map(word => word.trim()).filter(word => word !== '');
            return $http.post(`${base}/AddSynonyms`, synonyms).catch(() => {
                console.log('can not add synonyms');
            });
        };

        const GetSynonyms = (word = 'test') => {
            word = word.trim();
            return $http.get(`${base}/GetSynonym?word=${word}`).then(({data}) => data).catch(() => {
                console.log('Can not get synonyms');
            });
        };

        //Обновляэмо апи сервиса
        Object.assign(this, {getWords, addSynonyms, GetSynonyms});
    }])
    .controller('ThesaurusController', [ 'ThesaurusService', function (ThesaurusService) {ё
        //використовуэмо контроллер як ViewModel
        const vm = this;
        Object.assign(vm, {
            word: '',
            inputSynonyms: '',
            words: [],
            added: false,
            Load,
            Add,
            GetSynonyms
        });

        Load();

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