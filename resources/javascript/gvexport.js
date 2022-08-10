const appendPidTo = function (sourceId, targetId) {
    const ids = [];
    document.getElementById(targetId).value.split(",").forEach(function (id) {
        id = id.trim();
        if (id !== "") {
            ids.push(id);
        }
    });
    const newId = document.getElementById(sourceId).value.trim();
    if (ids.indexOf(newId) === -1) {
        ids.push(newId);
    }
    document.getElementById(targetId).value = ids.join(", ");
};


function hideSidebar(e) {
    document.querySelector(".sidebar").hidden = true;
    document.querySelector(".sidebar__toggler").hidden = false;
    e.preventDefault();
}

function showSidebar(e) {
    document.querySelector(".sidebar__toggler").hidden = true;
    document.querySelector(".sidebar").hidden = false;
    e.preventDefault();
}

document.querySelector(".hide-form").addEventListener("click", hideSidebar);


document.querySelector(".sidebar__toggler a").addEventListener("click", showSidebar);

document.addEventListener("keydown", function(e) {
    if (e.key === "Esc" || e.key === "Escape") {
        document.querySelector(".sidebar").hidden ? showSidebar(e) : hideSidebar(e);
    }
});

// Enable or disable the option to add photos.
// This is used when selecting diagram type, as only
// some types support photos.
function togglePhotos(enable) {
    document.getElementById("vars[with_photos]").disabled = !enable;
}

// Add or remove the % sign from the text input
function togglePercent(element, add) {
    // Clicked out of input field, add % sign
    let startval;
    if (add) {
        // Keep just numbers
        let boxVal = element.value.replace(/\D/g, "");
        // If result is blank, set to default
        if (boxVal === "") {
            boxVal = "100";
        }
        element.value =  boxVal + "%";
    } else {
        // Clicked in input box, remove % and select text,
        // but only select text the first time, let user move cursor if they want
        startval = element.value;
        element.value = element.value.replace("%", "");
        if (startval !== element.value) {
            element.select();
        }
    }
}

// This function ensures that if certain options are checked in regard to which relations to include,
// then other required options are selected. e.g. if "Anyone" is selected, all other options must
// all be selected
function updateRelationOption(field) {
    // If user clicked "All relatives"
    if (field === "indicous") {
        // If function triggered by checking "All relatives" field, ensure "Siblings" is checked
        if (document.getElementById("vars[indicous]").checked) {
            document.getElementById("vars[indisibl]").checked = true;
        }
        // If "All relatives" unchecked, uncheck "Anyone"
        if (!document.getElementById("vars[indicous]").checked) {
            document.getElementById("vars[indiany]").checked = false;
        }
    }
    // If user clicked "Siblings"
    if (field === "indisibl") {
        // If function triggered by unchecking "Siblings" field, ensure "All relatives" is unchecked
        if (!document.getElementById("vars[indisibl]").checked) {
            document.getElementById("vars[indicous]").checked = false;
        }
        // If "Siblings" unchecked, uncheck "Anyone"
        if (!document.getElementById("vars[indisibl]").checked) {
            document.getElementById("vars[indiany]").checked = false;
        }
    }
    // If user clicked "Spouses"
    if (field === "indispou") {
        // If function triggered by checking "All relatives" field, ensure "Siblings" is checked
        if (!document.getElementById("vars[indisibl]").checked) {
            document.getElementById("vars[indicous]").checked = false;
        }
        // If "Spouses" unchecked, uncheck "Anyone"
        if (!document.getElementById("vars[indispou]").checked) {
            document.getElementById("vars[indiany]").checked = false;
        }
    }
    // If function triggered by checking "All relatives" field, ensure everything else is checked
    if (field === "indiany") {
        if (document.getElementById("vars[indiany]").checked) {
            document.getElementById("vars[indicous]").checked = true;
            document.getElementById("vars[indisibl]").checked = true;
            document.getElementById("vars[indispou]").checked = true;

        }
    }

}

// Toggle items based on if the items in the cart should be used or not
// enable - if set to true, use cart. Update form to disable options. Set to false to reverse.
function toggleCart(enable) {
    const el = document.getElementsByClassName("cart_toggle");
    for (let i = 0; i < el.length; i++) {
        el.item(i).disabled = enable;
    }
    showHide("cart_toggle_hide", enable);
    showHide("cart_toggle_show", !enable);
}
// This function is used in toggleCart to show or hide all elements with a certain class,
// by adding or removing "display: none"
// css_class - the class to search for
// show - true to show the elements and false to hide them
function showHide(css_class, show) {
    let el = document.getElementsByClassName(css_class);
    for (let i = 0; i < el.length; i++) {
        if (show) {
            el.item(i).style.display = "none";
        } else {
            el.item(i).style.removeProperty("display");
        }
    }
}
