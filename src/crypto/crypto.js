const encoder = new TextEncoder();
export const getWrappedKey = async (masterPassword) => {
    const importedKey = await getImportedKey(masterPassword);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const derivedKey = await deriveKey(importedKey, salt);

    const [wrappedVaultKey, iv] = await getWrappedVaultKey(derivedKey);
    return `${bytesToString(wrappedVaultKey)}.${bytesToString(iv)}.${bytesToString(salt)}`;
}

export const getVaultKey = async (wrappedVaultKey, masterPassword) => {
    const [wrappedKey, iv, salt] = wrappedVaultKey.split('.');
    const importedKey = await getImportedKey(masterPassword);
    const derivedKey = await deriveKey(importedKey, stringToBytes(salt));
    return await unwrapVaultKey(wrappedKey, iv, derivedKey);
}

const getImportedKey = async (data) => {
    return await crypto.subtle.importKey(
        'raw',
        encoder.encode(data),
        'PBKDF2',
        false,
        ['deriveKey']
    );
}

const deriveKey = async (importedKey, salt) => {
    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        importedKey,
        {
            name: 'AES-GCM',
            length: 256
        },
        true,
        ['encrypt', 'decrypt']
    );
}

const getWrappedVaultKey = async (derivedKey) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const vaultKey = crypto.getRandomValues(new Uint8Array(32));
    console.log('vk', bytesToString(vaultKey));
    const wrappedVaultKey = await crypto.subtle.encrypt(
        {name: 'AES-GCM', iv: iv},
        derivedKey,
        vaultKey
    );

    return [new Uint8Array(wrappedVaultKey), iv];
}

const unwrapVaultKey = async (wrappedVaultKey, iv, derivedKey) => {
    const vaultKey = await crypto.subtle.decrypt(
        {name: 'AES-GCM', iv: stringToBytes(iv)},
        derivedKey,
        stringToBytes(wrappedVaultKey)
    );
    return bytesToString(new Uint8Array(vaultKey));
}

const bytesToString = (bytes) => btoa(String.fromCharCode(...bytes));
const stringToBytes = (string) => Uint8Array.from(atob(string), c => c.charCodeAt(0));