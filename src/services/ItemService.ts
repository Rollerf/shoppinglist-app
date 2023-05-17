import { API_URL } from "../../.env-vars";
import Item from "../models/Item";
import { authHeader } from "./AuthHeader";

const API_URL_ITEMS = API_URL + '//items';

class ItemService {
    async getItems() {
        console.debug("getItems");
        const header = await authHeader();

        return await fetch(API_URL_ITEMS, { headers: header }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        });
    }

    async createItem(item: Item) {
        return await fetch(API_URL_ITEMS, {
            method: 'POST',
            headers: await authHeader(),
            body: JSON.stringify(item)
        });
    }

    async modifyItem(item: Item) {
        return await fetch(API_URL_ITEMS, {
            method: 'PATCH',
            headers: await authHeader(),
            body: JSON.stringify(item)
        });
    }

    async deleteItem(item: Item) {
        item.deleted = true;
        return await fetch(API_URL_ITEMS, {
            method: 'PATCH',
            headers: await authHeader(),
            body: JSON.stringify(item)
        });
    }
}

export default new ItemService;