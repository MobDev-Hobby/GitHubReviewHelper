((document, window) => {
    // Build menu
    var Menu = function (id) {
        var menuDiv = document.createElement("div");
        $(menuDiv).jstree(JSON.parse(JSON.stringify(this)));
        menuDiv.id = id;

        this.core = {"data": []};

        this.refresh = () => {
            var jstree = $(menuDiv).jstree(true);
            jstree.settings.core = JSON.parse(JSON.stringify(this)).core;
            jstree.refresh();
            jstree.open_all();
        };

        this.loadPaths = (nodelist, map) => {
            this.core = {"data": []};
            console.log(nodelist);
            Array.prototype.slice.call(nodelist).forEach((node) => {
                this.addTreeNode(map(node));
            });
            this.refresh();
        };

        this.prependTo = (node) => {
            node.insertBefore(menuDiv, node.firstChild);
        };

        this.addEventListener = (event_type, callback) => {
            $(menuDiv).on(event_type, callback);
        };

        this.addTreeNode = (name) => {
            var root = '#';
            var parts = name.split('/');

            for (var i = 0; i < parts.length; i++) {

                var part = parts[i];
                var id = root + "/" + part;
                var extension = part.split(".");

                if (i == parts.length - 1) {
                    extension = extension.length > 1 && extension[extension.length - 1] || "";
                    if (!available_extensions.includes(extension)) {
                        extension = "_blank";
                    }
                }
                else {
                    extension = ""
                }
                this.core.data.find((node) => {
                    return node.id == id
                }) ||
                this.core.data.push({
                    "id": id,
                    "parent": root,
                    "text": part,
                    "icon": extension ? chrome.extension.getURL("/icons/" + extension + ".png") : ""
                });
                root = id;
            }
        }
    };

    var getChangedFiles = () => {
        // Old GitHub version
        var changedFiles = document.querySelectorAll(".file-info .user-select-contain");
        // New GitHub version
        if(changedFiles.length == 0){
            changedFiles = document.querySelectorAll(".file-info a");
        }
        return changedFiles;
    }

    // Ajax Pageload Watch
    var activeUrl = window.location.pathname;
    
    var delayUpdateTimer = undefined;
    var delayUpdate = () => {
        if(delayUpdateTimer){
            clearTimeout(delayUpdateTimer);
        }
        delayUpdateTimer = setTimeout(() => {
            if (activeUrl != window.location.pathname) {
                activeUrl = window.location.pathname;
                menu.loadPaths(getChangedFiles(), (node) => {
                    return node.title
                });
            }
        }, 500);
    }

    $(document).click(delayUpdate);

    var menu = new Menu("treeMenu");

    menu.loadPaths(getChangedFiles(), (node) => {
        return node.title
    });
    menu.prependTo(document.querySelectorAll("body")[0]);
    menu.addEventListener("changed.jstree", (e, data)=> {
        $(".file-info").parent().parent().hide(500);
        for (var selected of data.selected) {
            // Old GitHub
            $(".file-info .user-select-contain[title^='" + selected.substr(2) + "']").parent().parent().parent().show(500);
            // New GitHub
            $(".file-info a[title^='" + selected.substr(2) + "']").parent().parent().parent().show(500);
        }
    });

})(document, window);
