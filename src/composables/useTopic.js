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
        console.log(error);
        throwError('addTopicError');
    };
};

const editTopic = async (title, topicId) => {
    try {
        const topicRef = doc(db, 'topics', topicId);

        await updateDoc(topicRef, { title: title });
    } catch (error) {
        console.log(error);

        throwError('editTopicError');
    }
};

const deleteTopic = async (topicId) => {
    try {
        await deleteDoc(doc(db, 'topics', topicId));
    } catch (error) {
        throwError('deleteTopicError');
    }
};

const loadTopic = async (topicId) => {
    try {
        const docRef = doc(db, "topics", topicId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const topicData = docSnap.data();

            return {
                ...topicData,
                contents: sortContents(topicData.contents)
            };
        }
    } catch (error) {
        throwError("loadTopicError");
    }
};

const sortContents = (contents) => {
    return contents.sort((a, b) => {
        const descriptionA = a.description.toLowerCase();
        const descriptionB = b.description.toLowerCase();
        return descriptionA.localeCompare(descriptionB);
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
