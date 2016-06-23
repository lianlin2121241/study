/**
 * Created by Administrator on 16-6-23.
 */
;(function(window){
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
    var db={
        version:1,
        dbName:"pomotodo",
        errorHandle:function(e){
            console.log("Database error: "+ e.target.errorCode);
        },
        openDB:function(callback){
            var openRequest=window.indexedDB.open(this.dbName,this.version);
            openRequest.onerror=errorHandle
        }
    }
    window.app=window.app||{};
    window.app.db=db;
})(window)