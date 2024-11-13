import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const throwError = (code, message = 'Erro ao realizar operação') => {
    const error = new Error(message);
    error.code = code;
    throw error;
}

const lower = (word) => {
    return String(word).toLowerCase();
}

const searchContent = async (query) => {
    const filteredContents = [];
    const queryLower = lower(query);

    const querySnapshot = await getDocs(collection(db, "topics"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const contents = Object.values(data.contents);

        contents.forEach(content => {
            const title = lower(content.title);
            const description = lower(content.description);

            if (title.includes(queryLower) || description.includes(queryLower)) {
                filteredContents.push(content);
            }
        })
    });

    return filteredContents;
}

const loadContent = async (contentId, topicId) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            throwError('topicNotFound');
        }

        const topicData = docSnap.data();
        const content = topicData.contents.find(content => content.id === contentId);

        if (!content) {
            throwError('contentNotFound');
        }

        return content;
    } catch (error) {
        throwError(error);
    }
}

const addContent = async (topicId, description, link, title, created_by) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            throwError('topicNotFound');
        }

        const topicData = docSnap.data();
        topicData.contents.push({
            id: Date.now().toString(36),
            description: description,
            link: link,
            title: title,
            created_by: created_by,
        });

        await updateDoc(topicRef, { contents: topicData.contents });
    } catch (error) {
        console.error(error);
        throwError('addContentError');
    }
};

const editContent = async (contentId, topicId, description, link, title) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            throwError('topicNotFound');
        }

        const topicData = docSnap.data();
        const updatedContents = topicData.contents.map(content => (
            (content.id === contentId) ? {
                ...content,
                id: contentId,
                description: description,
                link: link,
                title: title,
            } : content
        ));

        await updateDoc(topicRef, { contents: updatedContents });
    } catch (error) {
        console.error(error);
        throwError('editContentError');
    }
};

const deleteContent = async (contentId, topicId) => {
    try {
        const docRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throwError('topicNotFound');
        }

        const topicData = docSnap.data();
        const newContents = topicData.contents.filter(content => content.id !== contentId);
        await updateDoc(docRef, { contents: newContents });
    } catch (error) {
        throwError('deleteContentError', error.message);
    }
};

export const useContent = () => {
    return {
        searchContent,
        loadContent,
        addContent,
        editContent,
        deleteContent
    }
}