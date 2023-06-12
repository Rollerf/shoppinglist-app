import Item from "../models/Item";
import { authHeader, authHeaderWithContentType } from "./AuthHeader";
import { REACT_APP_API_URL } from "@env";

const API_URL_ITEMS = REACT_APP_API_URL + '//items';

class ItemService {
    async getItems(): Promise<Item[]> {
        console.debug("getItems");
        const header = await authHeader();
        console.debug("getItems fetch");

        return await fetch(API_URL_ITEMS, { headers: header }).then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("getItems error: " + response.statusText);
        }).catch(error => {
            console.error("getItems error: " + error);
        });
    }

    async putItem(item: Item) {
        return await fetch(API_URL_ITEMS, {
            method: 'PUT',
            headers: await authHeaderWithContentType(),
            body: JSON.stringify(item)
        });
    }

    async deleteItem(item: Item) {
        item.deleted = true;
        return await fetch(API_URL_ITEMS, {
            method: 'PUT',
            headers: await authHeaderWithContentType(),
            body: JSON.stringify(item)
        });
    }
}

export default new ItemService;