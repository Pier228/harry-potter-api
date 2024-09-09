import { IsNotEmpty, IsString } from "class-validator";

export class AskAssistantDTO{
    @IsNotEmpty()
    @IsString()
    question: string;
}