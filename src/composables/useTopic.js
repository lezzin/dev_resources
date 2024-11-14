import { doc, getDoc, deleteDoc, addDoc, collection, where, query, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const throwError = (code, message = 'Erro ao realizar operação') => {
    const error = new Error(message);
    error.code = code;
    throw error;
}

const addTopic = async (title, userId) => {
    try {
        const topicsRef = collection(db, 'topics');
        const q = query(topicsRef, where('title', '==', title));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            throwError('topicExists');
        }

        const docRef = await addDoc(topicsRef, {
            title: title,
            contents: [],
            created_at: new Date(),
            created_by: userId,
        });

        return docRef.id;
    } catch (error) {
        console.error(error);
        throwError(error.code);
    };
};

const editTopic = async (title, topicId) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        await updateDoc(topicRef, { title: title });
    } catch (error) {
        console.error(error);
        throwError(error.code);
    }
};

const deleteTopic = async (topicId) => {
    try {
        await deleteDoc(doc(db, 'topics', topicId));
    } catch (error) {
        console.error(error);
        throwError(error.code);
    }
};

const loadTopic = async (topicId) => {
    try {
        const docRef = doc(db, "topics", topicId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throwError('topicNotFound');
        }

        const topicData = docSnap.data();

        if (!topicData) {
            throwError('topicNotFound');
        }

        return {
            ...topicData,
            contents: sortContents(topicData.contents)
        };
    } catch (error) {
        console.error(error);
        throwError(error.code);
    }
};

const sortContents = (contents) => {
    return contents.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
    });
};

export const useTopic = () => {
    return {
        deleteTopic,
        loadTopic,
        editTopic,
        addTopic
    };
};
