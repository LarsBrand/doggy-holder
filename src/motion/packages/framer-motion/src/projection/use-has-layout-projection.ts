import { rootProjectionNode } from "./node/HTMLProjectionNode"
import { IProjectionNode } from './node/types';


function findByIDRecursive(node :IProjectionNode<unknown>, layoutId:string):boolean {    
    if (node.options.layoutId == layoutId){
        return true
    }
    if (!!node.children){
        return !!Array.from(node.children).find(f => findByIDRecursive(f, layoutId))
    }
    return false
}

/**
 * useHasLayoutProjection will check if a given layout id has an active projection
 * @param layoutId ID used for the layout
 * @returns a boolean wether the layoutId has a active projection, IE will run a layout transform
 */
function useHasLayoutProjection(layoutId:string) {
        const root = rootProjectionNode.current;
        if (!root)
            return false;
        return !!layoutId &&  findByIDRecursive(root, layoutId);    
}

export { useHasLayoutProjection };
