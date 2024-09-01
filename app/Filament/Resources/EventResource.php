<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\Pages\RelationManagers\UsersRelationManager;
use App\Models\Event;
use Filament\Resources\Resource;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Columns\Column;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Concerns\InteractsWithTable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextArea::make('description')->required(),
                Forms\Components\DateTimePicker::make('start_time')->required(),
                Forms\Components\DateTimePicker::make('end_time')->required(),
                Forms\Components\TextInput::make('location')->required(), // Adding location field
                Forms\Components\TextInput::make('youth_points')
                    ->label('Youth Points')
                    ->numeric()
                    ->required(), // Adding youth points field
                Forms\Components\FileUpload::make('header_image')
                    ->label('Header Image')
                    ->image()
                    ->required(), // Adding file upload for header image
            ]);
            
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Event Name'),
                Tables\Columns\TextColumn::make('description')->label('Description'),
                Tables\Columns\TextColumn::make('start_time')->dateTime()->label('Start Time'),
                Tables\Columns\TextColumn::make('end_time')->dateTime()->label('End Time'),
                Tables\Columns\TextColumn::make('users_count')
                    ->label('Participants')
                    ->counts('users')
                    ->sortable(),
            ])
            ->filters([
                // Add any table filters if needed
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('viewParticipants')
                    ->label('View Participants')
                    ->url(fn (Event $record) => route('filament.resources.events.relationManager', [$record->getKey()]))
                    ->icon('heroicon-o-users')
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Events';
    }

    public static function getNavigationLabel(): string
    {
        return 'Events';
    }

    public static function getRelations(): array
    {
        return [
            UsersRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
