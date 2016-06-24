/**
 * Created by Administrator on 16-6-23.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function () {
    'use strict';
    window.indexedDB=window.indexedDB||
            window.mozIndexedDB||
            window.webkitIndexedDB||
            window.msIndexedDB;
    window.IDBTransaction=window.IDBTransaction||
            window.mozIDBTransaction||
            window.webkitIDBTransaction||
            window.msIDBTransaction;
    window.IDBKeyRange=window.IDBKeyRange||
            window.mozIDBKeyRange||
            window.webkitIDBKeyRange||
            window.msIDBKeyRange;

    function dbCommon(){
        this.version=1;
        this.dbName="pomotodo";
        this.instance={};
    }
    dbCommon.prototype={
        errorHandle:function(e){
            console.log("Database error: "+ e.target.errorCode);
        },
        upgradeneededHandel:function(e){
            var _db= e.target.result;
            var _stores=_db.objectStoreNames;
            if(!_stores.contains(this.dbStoreName)){
                var objectStore=_db.createObjectStore(this.dbStoreName,{
                    keyPath:"id",
                    autoIncrement:true
                })
                this.indexArr.forEach(function(item,index){
                    var indexRequest=objectStore.createIndex(item.name+"Index",item.name,{unique:item.unique});
                    indexRequest.onsuccess=function(e){
                        console.log(e.target.result);
                    }
                })
            }
        },
        openDB:function(callback){
            var self=this;
            var openRequest=window.indexedDB.open(this.dbName,this.version);
            openRequest.onerror=this.errorHandle;
            openRequest.onupgradeneeded=this.upgradeneededHandel.bind(self);
            openRequest.onsuccess=function(e){
                self.instance= e.target.result;
                callback.call(self);
            };
        },
        getObjectStore:function(model){
            var trans,store;
            var model=model||"readonly";
            trans=this.instance.transaction(this.dbStoreName,model);
            return store=trans.objectStore(this.dbStoreName);
        },
        save:function(data,callback){
            this.openDB(function(){
                var store=this.getObjectStore("readwrite");
                var saveRequest;
                if(!!data.id){
                    saveRequest=store.put(data);
                }else{
                    saveRequest=store.add(data);
                }
                saveRequest.onsuccess=callback;
            })
        },
        "delete":function(id,callback){
            this.openDB(function(){
                var store=this.getObjectStore("readwrite");
                var deleteResult=store.delete(id);
                deleteResult.onsuccess=callback;
            })
        },
        deleteArr:function(ids,callback){
            var self=this;
            var idsLength=ids.length;
            var count=0;
            this.openDB(function(){
                var store=this.getObjectStore("readwrite");
                ids.forEach(function(item,index){
                    var deleteResult=store.delete(item);
                    deleteResult.onsuccess=function(e){
                        count++;
                        if(count==idsLength){
                            callback.call(self);
                        }
                    };
                })
            })
        },
        searchAll:function(callback){
            this.openDB(function(){
                var store=this.getObjectStore("readonly");
                var cursorResult=store.openCursor();
                var data=[];
                cursorResult.onsuccess=function(e){
                    var result= e.target.result;
                    if(result&&result!=null){
                        data.push(result.value);
                        result.continue();
                    }else{
                        callback.call(this,data);
                    }
                }
            })
        },
        searchById:function(id,callback){
            this.openDB(function(){
                var store=this.getObjectStore("readonly");
                var getResult=store.get(id);
                getResult.onsuccess=function(e){
                    callback.call(this, e.target.result);
                }
            })
        },
        searchByIndex:function(indexName,value,callback){
            this.openDB(function(){
                var store=this.getObjectStore("readonly");
                var index=store.index(indexName);
                var getIndexResult=index.get(value);
                getIndexResult.onsuccess=function(e){
                    callback.call(this, e.target.result);
                }
            })
        },
        clearStore:function(callback){
            this.openDB(function(){
                var store=this.getObjectStore("readwrite");
                var clearRequest=store.clear();
                clearRequest.onsuccess=callback;
            })
        }
    }

    return {
        dbCommon:dbCommon
    }
})