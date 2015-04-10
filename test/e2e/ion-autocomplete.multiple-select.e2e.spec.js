'use strict';

describe('ion-autocomplete multiple select', function () {

    var htmlFileName = 'ion-autocomplete.multiple-select.e2e.html';

    it('must hide the search input field if the cancel button is pressed', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('button.ion-autocomplete-cancel')).click().then(function () {
                expect($('input.ion-autocomplete-search').isDisplayed()).toBeFalsy();
            });

        });
    });

    it('must show the list of found items if something is entered in the search', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('input.ion-autocomplete-search')).sendKeys("test");

            var itemList = element.all(by.repeater('item in items'));
            expect(itemList.count()).toEqual(3);
            expect(itemList.get(0).getText()).toEqual('view: test1');
            expect(itemList.get(1).getText()).toEqual('view: test2');
            expect(itemList.get(2).getText()).toEqual('view: test3');

        });
    });

    it('must note hide the search input field if a item in the list is clicked and the item must be selected', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('input.ion-autocomplete-search')).sendKeys("test");

            var itemList = element.all(by.repeater('item in items'));
            expect(itemList.count()).toEqual(3);
            itemList.get(0).click().then(function () {
                expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();
                expect($('input.ion-autocomplete-test-model').isDisplayed()).toBeTruthy();
                expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1');

                var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                expect(selectedItemList.count()).toEqual(1);
                expect(selectedItemList.get(0).getText()).toEqual('view: test1');
            })

        });
    });

    it('must not be able to add an item twice to the selected items', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('input.ion-autocomplete-search')).sendKeys("test");

            var itemList = element.all(by.repeater('item in items'));
            expect(itemList.count()).toEqual(3);
            itemList.get(0).click().then(function () {
                var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                expect(selectedItemList.count()).toEqual(1);
                expect(selectedItemList.get(0).getText()).toEqual('view: test1');
                expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1');

                element(by.css('input.ion-autocomplete-search')).sendKeys("test");
                var itemList = element.all(by.repeater('item in items'));
                itemList.get(0).click().then(function () {
                    var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                    expect(selectedItemList.count()).toEqual(1);
                    expect(selectedItemList.get(0).getText()).toEqual('view: test1');
                    expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1');
                });
            })

        });
    });

    it('must be able to delete an item if the delete button is clicked', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('input.ion-autocomplete-search')).sendKeys("test");

            // select first item
            var itemList = element.all(by.repeater('item in items'));
            expect(itemList.count()).toEqual(3);
            itemList.get(0).click().then(function () {
                var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                expect(selectedItemList.count()).toEqual(1);
                expect(selectedItemList.get(0).getText()).toEqual('view: test1');
                expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1');

                // select second item
                element(by.css('input.ion-autocomplete-search')).sendKeys("test");
                var itemList = element.all(by.repeater('item in items'));
                itemList.get(1).click().then(function () {
                    var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                    expect(selectedItemList.count()).toEqual(2);
                    expect(selectedItemList.get(0).getText()).toEqual('view: test1');
                    expect(selectedItemList.get(1).getText()).toEqual('view: test2');
                    expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1,test2');

                    // select third item
                    element(by.css('input.ion-autocomplete-search')).sendKeys("test");
                    var itemList = element.all(by.repeater('item in items'));
                    itemList.get(2).click().then(function () {
                        var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                        expect(selectedItemList.count()).toEqual(3);
                        expect(selectedItemList.get(0).getText()).toEqual('view: test1');
                        expect(selectedItemList.get(1).getText()).toEqual('view: test2');
                        expect(selectedItemList.get(2).getText()).toEqual('view: test3');
                        expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1,test2,test3');

                        // delete the item from the selected items
                        selectedItemList.get(1).element(by.css('[ng-click="removeItem($index)"]')).click().then(function () {
                            var selectedItemList = element.all(by.repeater('selectedItem in selectedItems'));
                            expect(selectedItemList.count()).toEqual(2);
                            expect(selectedItemList.get(0).getText()).toEqual('view: test1');
                            expect(selectedItemList.get(1).getText()).toEqual('view: test3');
                            expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1,test3');
                        })
                    });

                });
            })

        });
    });

});